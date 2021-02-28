using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers {
	public class AccountController : BaseApiController {
		private readonly DataContext _context;
		private readonly ITokenService _tokenService;
		private readonly IMapper _mapper;

		public AccountController(DataContext context, ITokenService tokenService, IMapper mapper) {
			_mapper = mapper;
			_tokenService = tokenService;
			_context = context;
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) {
			if (await UserExists(registerDto.UserName)) {
				return BadRequest("Username is taken.");
			}

			AppUser user = _mapper.Map<AppUser>(registerDto);

			user.UserName = registerDto.UserName.ToLower();

			_context.Users.Add(user);
			await _context.SaveChangesAsync();

			return new UserDto {
				UserName = user.UserName,
				Token = _tokenService.CreateToken(user),
				KnownAs = user.KnownAs,
				Gender = user.Gender
			};
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto) {
			AppUser user = await _context.Users
				.Include(p => p.Photos)
				.SingleOrDefaultAsync(user => user.UserName == loginDto.UserName);

			if (user == null) {
				return Unauthorized("Invalid username.");
			}

			return new UserDto {
				UserName = user.UserName,
				Token = _tokenService.CreateToken(user),
				PhotoUrl = user.Photos.FirstOrDefault(photo => photo.IsMain)?.Url,
				KnownAs = user.KnownAs,
				Gender = user.Gender
			};
		}

		private async Task<bool> UserExists(string username) {
			return await _context.Users.AnyAsync(user => user.UserName == username.ToLower());
		}
	}
}