(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["main"],
  {
    /***/ 0:
      /*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
      /*! no static exports found */
      /***/ function (module, exports, __webpack_require__) {
        module.exports = __webpack_require__(
          /*! C:\DatingApp\client\src\main.ts */ "zUnb"
        );

        /***/
      },

    /***/ "0d2m":
      /*!**************************************!*\
  !*** ./src/app/models/userParams.ts ***!
  \**************************************/
      /*! exports provided: UserParams */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "UserParams",
          function () {
            return UserParams;
          }
        );
        class UserParams {
          constructor(user) {
            this.minAge = 18;
            this.maxAge = 99;
            this.pageNumber = 1;
            this.pageSize = 5;
            this.orderBy = "lastActive";
            this.gender = user.gender === "female" ? "male" : "female";
          }
        }

        /***/
      },

    /***/ "15gN":
      /*!*********************************************!*\
  !*** ./src/app/services/members.service.ts ***!
  \*********************************************/
      /*! exports provided: MembersService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MembersService",
          function () {
            return MembersService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var _models_userParams__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ../models/userParams */ "0d2m"
        );
        /* harmony import */ var _paginationHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./paginationHelper */ "4IKs"
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );
        /* harmony import */ var _account_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./account.service */ "flj8"
        );

        class MembersService {
          constructor(http, accountService) {
            this.http = http;
            this.accountService = accountService;
            this.baseUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_3__[
                "environment"
              ].apiUrl;
            this.members = [];
            this.memberCache = new Map();
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)
              )
              .subscribe((user) => {
                this.user = user;
                this.userParams = new _models_userParams__WEBPACK_IMPORTED_MODULE_4__[
                  "UserParams"
                ](user);
              });
          }
          getUserParams() {
            return this.userParams;
          }
          setUserParams(params) {
            this.userParams = params;
          }
          resetUserParams() {
            this.userParams = new _models_userParams__WEBPACK_IMPORTED_MODULE_4__[
              "UserParams"
            ](this.user);
            return this.userParams;
          }
          getMembers(userParams) {
            const cacheKey = Object.values(userParams).join("-");
            const cacheResponse = this.memberCache.get(cacheKey);
            if (cacheResponse) {
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(
                cacheResponse
              );
            }
            let params = Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_5__[
                "getPaginationHeaders"
              ]
            )(userParams.pageNumber, userParams.pageSize);
            params = params.append("minAge", userParams.minAge.toString());
            params = params.append("maxAge", userParams.maxAge.toString());
            params = params.append("gender", userParams.gender);
            params = params.append("orderBy", userParams.orderBy);
            return Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_5__[
                "getPaginatedResult"
              ]
            )(`${this.baseUrl}users`, params, this.http).pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(
                (response) => {
                  this.memberCache.set(cacheKey, response);
                  return response;
                }
              )
            );
          }
          getMember(username) {
            const member = [...this.memberCache.values()]
              .reduce((arr, elem) => arr.concat(elem.result), [])
              .find((cachedMember) => cachedMember.username === username);
            if (member) {
              return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(member);
            }
            return this.http.get(`${this.baseUrl}users/${username}`);
          }
          updateMember(member) {
            return this.http.put(`${this.baseUrl}users`, member).pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(() => {
                const index = this.members.indexOf(member);
                this.members[index] = member;
              })
            );
          }
          setMainPhoto(photoId) {
            return this.http.put(
              `${this.baseUrl}users/set-main-photo/${photoId}`,
              {}
            );
          }
          deletePhoto(photoId) {
            return this.http.delete(
              `${this.baseUrl}users/delete-photo/${photoId}`
            );
          }
          addLike(username) {
            return this.http.post(`${this.baseUrl}likes/${username}`, {});
          }
          getLikes(predicate, pageNumber, pageSize) {
            let params = Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_5__[
                "getPaginationHeaders"
              ]
            )(pageNumber, pageSize);
            params = params.append("predicate", predicate);
            return Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_5__[
                "getPaginatedResult"
              ]
            )(`${this.baseUrl}likes`, params, this.http);
          }
        }
        MembersService.ɵfac = function MembersService_Factory(t) {
          return new (t || MembersService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _account_service__WEBPACK_IMPORTED_MODULE_7__["AccountService"]
            )
          );
        };
        MembersService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: MembersService,
          factory: MembersService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MembersService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_common_http__WEBPACK_IMPORTED_MODULE_6__[
                        "HttpClient"
                      ],
                  },
                  {
                    type:
                      _account_service__WEBPACK_IMPORTED_MODULE_7__[
                        "AccountService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ "1W4x":
      /*!************************************************!*\
  !*** ./src/app/register/register.component.ts ***!
  \************************************************/
      /*! exports provided: RegisterComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "RegisterComponent",
          function () {
            return RegisterComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var _forms_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ../forms/text-input/text-input.component */ "3O32"
        );
        /* harmony import */ var _forms_date_input_date_input_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ../forms/date-input/date-input.component */ "3gWd"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        // libs

        function RegisterComponent_div_20_li_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "li"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const error_r2 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " ",
              error_r2,
              " "
            );
          }
        }
        function RegisterComponent_div_20_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "ul",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              2,
              RegisterComponent_div_20_li_2_Template,
              2,
              1,
              "li",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngForOf",
              ctx_r0.validationErrors
            );
          }
        }
        class RegisterComponent {
          constructor(accountService, toastr, formBuilder, router) {
            this.accountService = accountService;
            this.toastr = toastr;
            this.formBuilder = formBuilder;
            this.router = router;
            this.cancelRegister = new _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "EventEmitter"
            ]();
            this.validationErrors = [];
          }
          ngOnInit() {
            this.initializeForm();
            this.maxDate = new Date();
            this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
          }
          initializeForm() {
            this.registerForm = this.formBuilder.group({
              gender: ["male"],
              username: [
                "",
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                  .required,
              ],
              knownAs: [
                "",
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                  .required,
              ],
              dateOfBirth: [
                "",
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                  .required,
              ],
              city: [
                "",
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                  .required,
              ],
              country: [
                "",
                _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                  .required,
              ],
              password: [
                "",
                [
                  _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                    .required,
                  _angular_forms__WEBPACK_IMPORTED_MODULE_1__[
                    "Validators"
                  ].minLength(4),
                  _angular_forms__WEBPACK_IMPORTED_MODULE_1__[
                    "Validators"
                  ].maxLength(8),
                ],
              ],
              confirmPassword: [
                "",
                [
                  _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"]
                    .required,
                  this.matchPasswords("password"),
                ],
              ],
            });
          }
          matchPasswords(matchTo) {
            return (control) => {
              var _a;
              return (control === null || control === void 0
                ? void 0
                : control.value) ===
                ((_a =
                  control === null || control === void 0
                    ? void 0
                    : control.parent) === null || _a === void 0
                  ? void 0
                  : _a.controls[matchTo].value)
                ? null
                : { isMatching: true };
            };
          }
          register() {
            this.accountService.register(this.registerForm.value).subscribe(
              (response) => {
                this.router.navigateByUrl("/members");
              },
              (error) => {
                this.validationErrors = error;
              }
            );
          }
          cancel() {
            this.cancelRegister.emit(false);
          }
        }
        RegisterComponent.ɵfac = function RegisterComponent_Factory(t) {
          return new (t || RegisterComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"]
            )
          );
        };
        RegisterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: RegisterComponent,
          selectors: [["app-register"]],
          outputs: { cancelRegister: "cancelRegister" },
          decls: 26,
          vars: 20,
          consts: [
            ["autocomplete", "off", 3, "formGroup", "ngSubmit"],
            [1, "text-center", "text-primary"],
            [1, "form-group"],
            [1, "control-label", 2, "margin-right", "10px"],
            [1, "radio-inline"],
            ["type", "radio", "value", "male", "formControlName", "gender"],
            [
              "type",
              "radio",
              "value",
              "female",
              "formControlName",
              "gender",
              1,
              "ml-3",
            ],
            [3, "formControl", "label"],
            [3, "formControl", "label", "maxDate"],
            [3, "formControl", "label", "type"],
            ["class", "row", 4, "ngIf"],
            [1, "form-group", "text-center"],
            ["type", "submit", 1, "btn", "btn-success", "mr-2", 3, "disabled"],
            ["type", "button", 1, "btn", "btn-default", "mr-2", 3, "click"],
            [1, "row"],
            [1, "text-danger"],
            [4, "ngFor", "ngForOf"],
          ],
          template: function RegisterComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "form",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngSubmit",
                function RegisterComponent_Template_form_ngSubmit_0_listener() {
                  return ctx.registerForm.valid && ctx.register();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h2",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                2,
                "Sign Up"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "hr");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                5,
                "label",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                6,
                "I am a: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "label",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                8,
                "input",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Male ");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "label",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                11,
                "input",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                12,
                " Female "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                13,
                "app-text-input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                14,
                "app-text-input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                15,
                "app-date-input",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                16,
                "app-text-input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                17,
                "app-text-input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                18,
                "app-text-input",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                19,
                "app-text-input",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                20,
                RegisterComponent_div_20_Template,
                3,
                1,
                "div",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                21,
                "div",
                11
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                22,
                "button",
                12
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                23,
                " Register "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                24,
                "button",
                13
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function RegisterComponent_Template_button_click_24_listener() {
                  return ctx.cancel();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                25,
                " Cancel "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formGroup",
                ctx.registerForm
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["username"]
              )("label", "Username");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["knownAs"]
              )("label", "Known As");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["dateOfBirth"]
              )("label", "Date Of Birth")("maxDate", ctx.maxDate);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["city"]
              )("label", "City");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["country"]
              )("label", "Country");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["password"]
              )("label", "Password")("type", "password");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.registerForm.controls["confirmPassword"]
              )("label", "Confirm Password")("type", "password");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.validationErrors.length > 0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "disabled",
                !ctx.registerForm.valid
              );
            }
          },
          directives: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__[
              "RadioControlValueAccessor"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"],
            _forms_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_5__[
              "TextInputComponent"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"],
            _forms_date_input_date_input_component__WEBPACK_IMPORTED_MODULE_6__[
              "DateInputComponent"
            ],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudC5jc3MifQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              RegisterComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-register",
                      templateUrl: "./register.component.html",
                      styleUrls: ["./register.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
                  },
                  {
                    type:
                      _angular_forms__WEBPACK_IMPORTED_MODULE_1__[
                        "FormBuilder"
                      ],
                  },
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
                  },
                ];
              },
              {
                cancelRegister: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ "2Oae":
      /*!**********************************************!*\
  !*** ./src/app/services/presence.service.ts ***!
  \**********************************************/
      /*! exports provided: PresenceService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "PresenceService",
          function () {
            return PresenceService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _microsoft_signalr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @microsoft/signalr */ "6HpG"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        // Libs

        class PresenceService {
          constructor(toastr, router) {
            this.toastr = toastr;
            this.router = router;
            this.hubUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_4__[
                "environment"
              ].hubUrl;
            this.onlineUsersSource = new rxjs__WEBPACK_IMPORTED_MODULE_2__[
              "BehaviorSubject"
            ]([]);
            this.onlineUsers$ = this.onlineUsersSource.asObservable();
          }
          createHubConnection(user) {
            this.hubConnection = new _microsoft_signalr__WEBPACK_IMPORTED_MODULE_1__[
              "HubConnectionBuilder"
            ]()
              .withUrl(`${this.hubUrl}presence`, {
                accessTokenFactory: () => user.token,
              })
              .withAutomaticReconnect()
              .build();
            this.hubConnection.start().catch((error) => console.log(error));
            this.hubConnection.on("UserIsOnline", (username) => {
              this.onlineUsers$
                .pipe(
                  Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)
                )
                .subscribe((usernames) => {
                  this.onlineUsersSource.next([...usernames, username]);
                });
            });
            this.hubConnection.on("UserIsOffline", (username) => {
              this.onlineUsers$
                .pipe(
                  Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)
                )
                .subscribe((usernames) => {
                  this.onlineUsersSource.next([
                    ...usernames.filter((name) => name !== username),
                  ]);
                });
            });
            this.hubConnection.on("GetOnlineUsers", (usernames) => {
              this.onlineUsersSource.next(usernames);
            });
            this.hubConnection.on(
              "NewMessageReceived",
              ({ username, knownAs }) => {
                this.toastr
                  .info(`${knownAs} has sent you a new message!`)
                  .onTap.pipe(
                    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(
                      1
                    )
                  )
                  .subscribe(() =>
                    this.router.navigateByUrl(`/members/${username}?tab=3`)
                  );
              }
            );
          }
          stopHubConnection() {
            this.hubConnection.stop().catch((error) => console.log(error));
          }
        }
        PresenceService.ɵfac = function PresenceService_Factory(t) {
          return new (t || PresenceService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"]
            )
          );
        };
        PresenceService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: PresenceService,
          factory: PresenceService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              PresenceService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"],
                  },
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ "2qCV":
      /*!**********************************************************************!*\
  !*** ./src/app/members/member-messages/member-messages.component.ts ***!
  \**********************************************************************/
      /*! exports provided: MemberMessagesComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberMessagesComponent",
          function () {
            return MemberMessagesComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! src/app/services/message.service */ "tZre"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ngx-timeago */ "twue"
        );
        // Libs

        const _c0 = ["messageForm"];
        function MemberMessagesComponent_div_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              1,
              " No messages yet... say hi by using the message box below "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function MemberMessagesComponent_ul_4_li_2_span_10_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "span",
              22
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              1,
              " (unread) "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function MemberMessagesComponent_ul_4_li_2_span_11_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "span",
              23
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "timeago");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const message_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]().$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " (read ",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                2,
                1,
                message_r5.dateRead
              ),
              ") "
            );
          }
        }
        function MemberMessagesComponent_ul_4_li_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "li"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "span",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              3,
              "img",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "div",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "div",
              17
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "small",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              7,
              "span",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "timeago");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              10,
              MemberMessagesComponent_ul_4_li_2_span_10_Template,
              2,
              0,
              "span",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              11,
              MemberMessagesComponent_ul_4_li_2_span_11_Template,
              3,
              3,
              "span",
              21
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              12,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const message_r5 = ctx.$implicit;
            const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              message_r5.senderPhotoUrl || "./assets/user.png",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              message_r5.senderUsername
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " ",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                9,
                6,
                message_r5.messageSent
              ),
              ""
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              !message_r5.dateRead &&
                message_r5.senderUsername !== ctx_r4.username
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              message_r5.dateRead &&
                message_r5.senderUsername !== ctx_r4.username
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              message_r5.content
            );
          }
        }
        function MemberMessagesComponent_ul_4_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "ul",
              11,
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              2,
              MemberMessagesComponent_ul_4_li_2_Template,
              14,
              8,
              "li",
              13
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵreference"
            ](1);
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "scrollTop",
              _r3.scrollHeight
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngForOf",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                3,
                2,
                ctx_r1.messageService.messageThread$
              )
            );
          }
        }
        class MemberMessagesComponent {
          constructor(messageService) {
            this.messageService = messageService;
          }
          ngOnInit() {}
          sendMessage() {
            this.messageService
              .sendMessage(this.username, this.messageContent)
              .then(() => {
                this.messageForm.reset();
              });
          }
        }
        MemberMessagesComponent.ɵfac = function MemberMessagesComponent_Factory(
          t
        ) {
          return new (t || MemberMessagesComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_message_service__WEBPACK_IMPORTED_MODULE_1__[
                "MessageService"
              ]
            )
          );
        };
        MemberMessagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MemberMessagesComponent,
          selectors: [["app-member-messages"]],
          viewQuery: function MemberMessagesComponent_Query(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
            }
            if (rf & 2) {
              let _t;
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](
                (_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵloadQuery"
                ]())
              ) && (ctx.messageForm = _t.first);
            }
          },
          inputs: { messages: "messages", username: "username" },
          decls: 14,
          vars: 8,
          consts: [
            [1, "card"],
            [1, "card-body"],
            [4, "ngIf"],
            [
              "style",
              "overflow: scroll; height: 500px",
              "class",
              "chat",
              3,
              "scrollTop",
              4,
              "ngIf",
            ],
            [1, "card-footer"],
            ["autocomplete", "off", 3, "ngSubmit"],
            ["messageForm", "ngForm"],
            [1, "input-group"],
            [
              "name",
              "messageContent",
              "required",
              "",
              "type",
              "text",
              "placeholder",
              "Send a private message",
              1,
              "form-control",
              "input-sm",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [1, "input-group-append"],
            ["type", "submit", 1, "btn", "btn-primary", 3, "disabled"],
            [
              1,
              "chat",
              2,
              "overflow",
              "scroll",
              "height",
              "500px",
              3,
              "scrollTop",
            ],
            ["scrollMe", ""],
            [4, "ngFor", "ngForOf"],
            [1, "chat-img", "float-right"],
            [1, "rounded-circle", 3, "src", "alt"],
            [1, "chat-body"],
            [1, "header"],
            [1, "text-muted"],
            [1, "fa", "fa-clock-o"],
            ["class", "text-danger", 4, "ngIf"],
            ["class", "text-success", 4, "ngIf"],
            [1, "text-danger"],
            [1, "text-success"],
          ],
          template: function MemberMessagesComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                2,
                MemberMessagesComponent_div_2_Template,
                2,
                0,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](3, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                4,
                MemberMessagesComponent_ul_4_Template,
                4,
                4,
                "ul",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](5, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "div",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "form",
                5,
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngSubmit",
                function MemberMessagesComponent_Template_form_ngSubmit_7_listener() {
                  return ctx.sendMessage();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                9,
                "div",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "input",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MemberMessagesComponent_Template_input_ngModelChange_10_listener(
                  $event
                ) {
                  return (ctx.messageContent = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                11,
                "div",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                12,
                "button",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                13,
                " Send "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵreference"
              ](8);
              let tmp_0_0 = null;
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ((tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵpipeBind1"
                ](3, 4, ctx.messageService.messageThread$)) == null
                  ? null
                  : tmp_0_0.length) === 0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  5,
                  6,
                  ctx.messageService.messageThread$
                ).length > 0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.messageContent
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "disabled",
                !_r2.valid
              );
            }
          },
          directives: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgForm"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["RequiredValidator"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"],
          ],
          pipes: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"],
            ngx_timeago__WEBPACK_IMPORTED_MODULE_4__["TimeagoPipe"],
          ],
          styles: [
            ".card[_ngcontent-%COMP%] {\n  border: none;\n}\n\n.chat[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.chat[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 10px;\n  padding-bottom: 10px;\n  border-bottom: 1px dotted #b3a9a9;\n}\n\n.rounded-circle[_ngcontent-%COMP%] {\n  max-height: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZW1iZXItbWVzc2FnZXMvbWVtYmVyLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLG1CQUFtQjtFQUNuQixvQkFBb0I7RUFDcEIsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCIiwiZmlsZSI6InNyYy9hcHAvbWVtYmVycy9tZW1iZXItbWVzc2FnZXMvbWVtYmVyLW1lc3NhZ2VzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZCB7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLmNoYXQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG59XG5cbi5jaGF0IGxpIHtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgcGFkZGluZy1ib3R0b206IDEwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgI2IzYTlhOTtcbn1cblxuLnJvdW5kZWQtY2lyY2xlIHtcbiAgbWF4LWhlaWdodDogNTBweDtcbn1cbiJdfQ== */",
          ],
          changeDetection: 0,
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberMessagesComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      changeDetection:
                        _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                          "ChangeDetectionStrategy"
                        ].OnPush,
                      selector: "app-member-messages",
                      templateUrl: "./member-messages.component.html",
                      styleUrls: ["./member-messages.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_message_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MessageService"
                      ],
                  },
                ];
              },
              {
                messageForm: [
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
                    args: ["messageForm"],
                  },
                ],
                messages: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
                username: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ "3O32":
      /*!**********************************************************!*\
  !*** ./src/app/forms/text-input/text-input.component.ts ***!
  \**********************************************************/
      /*! exports provided: TextInputComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "TextInputComponent",
          function () {
            return TextInputComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );

        function TextInputComponent_div_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " Please enter a ",
              ctx_r0.label,
              " "
            );
          }
        }
        function TextInputComponent_div_3_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](
              " ",
              ctx_r1.label,
              " must be at least ",
              ctx_r1.ngControl.control.errors.minlength["requiredLength"],
              " "
            );
          }
        }
        function TextInputComponent_div_4_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](
              " ",
              ctx_r2.label,
              " must be at most ",
              ctx_r2.ngControl.control.errors.maxlength["requiredLength"],
              " "
            );
          }
        }
        function TextInputComponent_div_5_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              1,
              " Passwords do not match "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        class TextInputComponent {
          constructor(ngControl) {
            this.ngControl = ngControl;
            this.type = "text";
            this.ngControl.valueAccessor = this;
          }
          writeValue(obj) {}
          registerOnChange(fn) {}
          registerOnTouched(fn) {}
        }
        TextInputComponent.ɵfac = function TextInputComponent_Factory(t) {
          return new (t || TextInputComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"],
              2
            )
          );
        };
        TextInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: TextInputComponent,
          selectors: [["app-text-input"]],
          inputs: { label: "label", type: "type" },
          decls: 6,
          vars: 9,
          consts: [
            [1, "form-group"],
            [1, "form-control", 3, "type", "formControl", "placeholder"],
            ["class", "invalid-feedback", 4, "ngIf"],
            [1, "invalid-feedback"],
          ],
          template: function TextInputComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                1,
                "input",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                2,
                TextInputComponent_div_2_Template,
                2,
                1,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                3,
                TextInputComponent_div_3_Template,
                2,
                2,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                4,
                TextInputComponent_div_4_Template,
                2,
                2,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                5,
                TextInputComponent_div_5_Template,
                2,
                0,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"](
                "is-invalid",
                ctx.ngControl.touched && ctx.ngControl.invalid
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ]("type", ctx.type);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ]("placeholder", ctx.label);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.ngControl.control
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.ngControl.control.errors == null
                  ? null
                  : ctx.ngControl.control.errors.required
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.ngControl.control.errors == null
                  ? null
                  : ctx.ngControl.control.errors.minlength
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.ngControl.control.errors == null
                  ? null
                  : ctx.ngControl.control.errors.maxlength
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.ngControl.control.errors == null
                  ? null
                  : ctx.ngControl.control.errors.isMatching
              );
            }
          },
          directives: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL3RleHQtaW5wdXQvdGV4dC1pbnB1dC5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              TextInputComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-text-input",
                      templateUrl: "./text-input.component.html",
                      styleUrls: ["./text-input.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"],
                    decorators: [
                      {
                        type:
                          _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"],
                      },
                    ],
                  },
                ];
              },
              {
                label: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
                type: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ "3gWd":
      /*!**********************************************************!*\
  !*** ./src/app/forms/date-input/date-input.component.ts ***!
  \**********************************************************/
      /*! exports provided: DateInputComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "DateInputComponent",
          function () {
            return DateInputComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ngx-bootstrap/datepicker */ "hzby"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );

        function DateInputComponent_div_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " ",
              ctx_r0.label,
              " is required "
            );
          }
        }
        class DateInputComponent {
          constructor(ngControl) {
            this.ngControl = ngControl;
            this.ngControl.valueAccessor = this;
            this.bsConfig = {
              containerClass: "theme-red",
              dateInputFormat: "DD MMMM YYYY",
            };
          }
          writeValue(obj) {}
          registerOnChange(fn) {}
          registerOnTouched(fn) {}
        }
        DateInputComponent.ɵfac = function DateInputComponent_Factory(t) {
          return new (t || DateInputComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"],
              2
            )
          );
        };
        DateInputComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: DateInputComponent,
          selectors: [["app-date-input"]],
          inputs: { label: "label", maxDate: "maxDate" },
          decls: 3,
          vars: 7,
          consts: [
            [1, "form-group"],
            [
              "type",
              "text",
              "bsDatepicker",
              "",
              1,
              "form-control",
              3,
              "formControl",
              "placeholder",
              "bsConfig",
              "maxDate",
            ],
            ["class", "invalid-feedback", 4, "ngIf"],
            [1, "invalid-feedback"],
          ],
          template: function DateInputComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                1,
                "input",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                2,
                DateInputComponent_div_2_Template,
                2,
                1,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"](
                "is-invalid",
                ctx.ngControl.touched && ctx.ngControl.invalid
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ]("placeholder", ctx.label);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "formControl",
                ctx.ngControl.control
              )("bsConfig", ctx.bsConfig)("maxDate", ctx.maxDate);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.ngControl.control.errors == null
                  ? null
                  : ctx.ngControl.control.errors.required
              );
            }
          },
          directives: [
            ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_2__[
              "BsDatepickerInputDirective"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"],
            ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_2__[
              "BsDatepickerDirective"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlDirective"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Zvcm1zL2RhdGUtaW5wdXQvZGF0ZS1pbnB1dC5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              DateInputComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-date-input",
                      templateUrl: "./date-input.component.html",
                      styleUrls: ["./date-input.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControl"],
                    decorators: [
                      {
                        type:
                          _angular_core__WEBPACK_IMPORTED_MODULE_0__["Self"],
                      },
                    ],
                  },
                ];
              },
              {
                label: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
                maxDate: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ "4+ph":
      /*!**********************************************************************!*\
  !*** ./src/app/admin/photo-management/photo-management.component.ts ***!
  \**********************************************************************/
      /*! exports provided: PhotoManagementComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "PhotoManagementComponent",
          function () {
            return PhotoManagementComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );

        class PhotoManagementComponent {
          constructor() {}
          ngOnInit() {}
        }
        PhotoManagementComponent.ɵfac = function PhotoManagementComponent_Factory(
          t
        ) {
          return new (t || PhotoManagementComponent)();
        };
        PhotoManagementComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: PhotoManagementComponent,
          selectors: [["app-photo-management"]],
          decls: 2,
          vars: 0,
          template: function PhotoManagementComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                1,
                "photo-management works!"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
          },
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3Bob3RvLW1hbmFnZW1lbnQvcGhvdG8tbWFuYWdlbWVudC5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              PhotoManagementComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-photo-management",
                      templateUrl: "./photo-management.component.html",
                      styleUrls: ["./photo-management.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [];
              },
              null
            );
        })();

        /***/
      },

    /***/ "4IKs":
      /*!**********************************************!*\
  !*** ./src/app/services/paginationHelper.ts ***!
  \**********************************************/
      /*! exports provided: getPaginatedResult, getPaginationHeaders */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getPaginatedResult",
          function () {
            return getPaginatedResult;
          }
        );
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "getPaginationHeaders",
          function () {
            return getPaginationHeaders;
          }
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _models_pagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../models/pagination */ "RzZf"
        );
        // Libs

        // Models

        function getPaginatedResult(url, params, http) {
          const paginatedResult = new _models_pagination__WEBPACK_IMPORTED_MODULE_2__[
            "PaginatedResult"
          ]();
          return http.get(url, { observe: "response", params }).pipe(
            Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(
              (response) => {
                paginatedResult.result = response.body;
                if (response.headers.get("Pagination") !== null) {
                  paginatedResult.pagination = JSON.parse(
                    response.headers.get("Pagination")
                  );
                }
                return paginatedResult;
              }
            )
          );
        }
        function getPaginationHeaders(pageNumber, pageSize) {
          let params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__[
            "HttpParams"
          ]();
          params = params.append("pageNumber", pageNumber.toString());
          params = params.append("pageSize", pageSize.toString());
          return params;
        }

        /***/
      },

    /***/ "4rg4":
      /*!*********************************************************!*\
  !*** ./src/app/errors/not-found/not-found.component.ts ***!
  \*********************************************************/
      /*! exports provided: NotFoundComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "NotFoundComponent",
          function () {
            return NotFoundComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );

        class NotFoundComponent {
          constructor() {}
          ngOnInit() {}
        }
        NotFoundComponent.ɵfac = function NotFoundComponent_Factory(t) {
          return new (t || NotFoundComponent)();
        };
        NotFoundComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: NotFoundComponent,
          selectors: [["app-not-found"]],
          decls: 5,
          vars: 0,
          consts: [
            [1, "container"],
            ["routerLink", "/", 1, "btn", "btn-info", "btn-lg"],
          ],
          template: function NotFoundComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h1"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                2,
                "Not found"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "button",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                4,
                " Return to home page "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
          },
          directives: [
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterLink"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Vycm9ycy9ub3QtZm91bmQvbm90LWZvdW5kLmNvbXBvbmVudC5jc3MifQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              NotFoundComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-not-found",
                      templateUrl: "./not-found.component.html",
                      styleUrls: ["./not-found.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [];
              },
              null
            );
        })();

        /***/
      },

    /***/ "81j5":
      /*!***************************************************************!*\
  !*** ./src/app/errors/server-error/server-error.component.ts ***!
  \***************************************************************/
      /*! exports provided: ServerErrorComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ServerErrorComponent",
          function () {
            return ServerErrorComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );

        function ServerErrorComponent_ng_container_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵelementContainerStart"
            ](0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "h5",
              1
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "code",
              2
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵelementContainerEnd"
            ]();
          }
          if (rf & 2) {
            const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              "Error: ",
              ctx_r0.error.message,
              ""
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              ctx_r0.error.details
            );
          }
        }
        class ServerErrorComponent {
          constructor(router) {
            var _a, _b;
            this.router = router;
            const navigation = this.router.getCurrentNavigation();
            this.error =
              (_b =
                (_a =
                  navigation === null || navigation === void 0
                    ? void 0
                    : navigation.extras) === null || _a === void 0
                  ? void 0
                  : _a.state) === null || _b === void 0
                ? void 0
                : _b.error;
          }
          ngOnInit() {}
        }
        ServerErrorComponent.ɵfac = function ServerErrorComponent_Factory(t) {
          return new (t || ServerErrorComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]
            )
          );
        };
        ServerErrorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: ServerErrorComponent,
          selectors: [["app-server-error"]],
          decls: 3,
          vars: 1,
          consts: [
            [4, "ngIf"],
            [1, "text-danger"],
            [1, "mt-5", 2, "background-color", "whitesmoke"],
          ],
          template: function ServerErrorComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "h4"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                1,
                " Internal Server Error - refreshing the page will make the error disappear!\n"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                2,
                ServerErrorComponent_ng_container_2_Template,
                5,
                2,
                "ng-container",
                0
              );
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.error
              );
            }
          },
          directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"]],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2Vycm9ycy9zZXJ2ZXItZXJyb3Ivc2VydmVyLWVycm9yLmNvbXBvbmVudC5jc3MifQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              ServerErrorComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-server-error",
                      templateUrl: "./server-error.component.html",
                      styleUrls: ["./server-error.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ "9vUh":
      /*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
      /*! exports provided: HomeComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "HomeComponent",
          function () {
            return HomeComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../register/register.component */ "1W4x"
        );
        // libs

        function HomeComponent_div_1_Template(rf, ctx) {
          if (rf & 1) {
            const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "h1"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              "Find your match"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "p",
              4
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              4,
              " Come on in to view your matches... all you need to do is sign up! "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "div",
              5
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "button",
              6
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function HomeComponent_div_1_Template_button_click_6_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r3
                );
                const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r2.registerToggle();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              7,
              " Register "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              8,
              "button",
              7
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              9,
              "Learn more"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function HomeComponent_div_2_Template(rf, ctx) {
          if (rf & 1) {
            const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "div",
              9
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "div",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "app-register",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "cancelRegister",
              function HomeComponent_div_2_Template_app_register_cancelRegister_3_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r5
                );
                const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r4.cancelRegisterMode($event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        class HomeComponent {
          constructor() {
            this.registerMode = false;
          }
          ngOnInit() {}
          registerToggle() {
            this.registerMode = !this.registerMode;
          }
          cancelRegisterMode(event) {
            this.registerMode = event;
          }
        }
        HomeComponent.ɵfac = function HomeComponent_Factory(t) {
          return new (t || HomeComponent)();
        };
        HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: HomeComponent,
          selectors: [["app-home"]],
          decls: 3,
          vars: 2,
          consts: [
            [1, "container", "mt-5"],
            ["style", "text-align: center", 4, "ngIf"],
            ["class", "container", 4, "ngIf"],
            [2, "text-align", "center"],
            [1, "lead"],
            [1, "text-center"],
            [1, "btn", "btn-primary", "btn-lg", "mr-2", 3, "click"],
            [1, "btn", "btn-info", "btn-lg"],
            [1, "container"],
            [1, "row", "justify-content-center"],
            [1, "col-4"],
            [3, "cancelRegister"],
          ],
          template: function HomeComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                1,
                HomeComponent_div_1_Template,
                10,
                0,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                2,
                HomeComponent_div_2_Template,
                4,
                0,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                !ctx.registerMode
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.registerMode
              );
            }
          },
          directives: [
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"],
            _register_register_component__WEBPACK_IMPORTED_MODULE_2__[
              "RegisterComponent"
            ],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              HomeComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-home",
                      templateUrl: "./home.component.html",
                      styleUrls: ["./home.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [];
              },
              null
            );
        })();

        /***/
      },

    /***/ A9p3:
      /*!*********************************************!*\
  !*** ./src/app/services/confirm.service.ts ***!
  \*********************************************/
      /*! exports provided: ConfirmService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ConfirmService",
          function () {
            return ConfirmService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var _modals_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../modals/confirm-dialog/confirm-dialog.component */ "vMgs"
        );
        /* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-bootstrap/modal */ "LqlI"
        );
        // Libs

        // Components

        class ConfirmService {
          constructor(modalService) {
            this.modalService = modalService;
          }
          confirm(
            title = "Confirmation",
            message = "Are you sure?",
            btnOkText = "Ok",
            btnCancelText = "Cancel"
          ) {
            const config = {
              initialState: {
                title,
                message,
                btnOkText,
                btnCancelText,
              },
            };
            this.bsModalRef = this.modalService.show(
              _modals_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__[
                "ConfirmDialogComponent"
              ],
              config
            );
            return new rxjs__WEBPACK_IMPORTED_MODULE_1__["Observable"](
              this.getResult()
            );
          }
          getResult() {
            return (observer) => {
              const subscription = this.bsModalRef.onHidden.subscribe(() => {
                observer.next(this.bsModalRef.content.result);
                observer.complete();
              });
              return {
                unsubscribe() {
                  subscription.unsubscribe();
                },
              };
            };
          }
        }
        ConfirmService.ɵfac = function ConfirmService_Factory(t) {
          return new (t || ConfirmService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["BsModalService"]
            )
          );
        };
        ConfirmService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: ConfirmService,
          factory: ConfirmService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              ConfirmService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__[
                        "BsModalService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ "AJ6+":
      /*!*******************************************!*\
  !*** ./src/app/services/admin.service.ts ***!
  \*******************************************/
      /*! exports provided: AdminService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AdminService",
          function () {
            return AdminService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );

        class AdminService {
          constructor(http) {
            this.http = http;
            this.baseUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_1__[
                "environment"
              ].apiUrl;
          }
          getUsersWithRoles() {
            return this.http.get(`${this.baseUrl}admin/users-with-roles`);
          }
          updateUserRoles(username, roles) {
            return this.http.post(
              `${this.baseUrl}admin/edit-roles/${username}?roles=${roles}`,
              {}
            );
          }
        }
        AdminService.ɵfac = function AdminService_Factory(t) {
          return new (t || AdminService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]
            )
          );
        };
        AdminService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: AdminService,
          factory: AdminService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AdminService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                        "HttpClient"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ AytR:
      /*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
      /*! exports provided: environment */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "environment",
          function () {
            return environment;
          }
        );
        // This file can be replaced during build by using the `fileReplacements` array.
        // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
        // The list of file replacements can be found in `angular.json`.
        const environment = {
          production: false,
          apiUrl: "https://localhost:5001/api/",
          hubUrl: "https://localhost:5001/hubs/",
        };
        /*
         * For easier debugging in development mode, you can import the following file
         * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
         *
         * This import should be commented out in production mode because it will have a negative impact
         * on performance if an error is thrown.
         */
        // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

        /***/
      },

    /***/ DruN:
      /*!************************************************!*\
  !*** ./src/app/messages/messages.component.ts ***!
  \************************************************/
      /*! exports provided: MessagesComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MessagesComponent",
          function () {
            return MessagesComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_message_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../services/message.service */ "tZre"
        );
        /* harmony import */ var _services_confirm_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/confirm.service */ "A9p3"
        );
        /* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-bootstrap/buttons */ "s3T5"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ngx-bootstrap/pagination */ "Lm2G"
        );
        /* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ngx-timeago */ "twue"
        );
        // Libs

        function MessagesComponent_div_11_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "h3"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              "No messages"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function MessagesComponent_div_12_tr_10_div_2_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              1,
              "img",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](
              4,
              "titlecase"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const message_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]().$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              message_r4.recipientPhotoUrl || "./assets/user.png",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              message_r4.recipientUsername
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                4,
                3,
                message_r4.recipientUsername
              )
            );
          }
        }
        function MessagesComponent_div_12_tr_10_div_3_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              1,
              "img",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](
              4,
              "titlecase"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const message_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]().$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              message_r4.senderPhotoUrl || "./assets/user.png",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              message_r4.senderUsername
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                4,
                3,
                message_r4.senderUsername
              )
            );
          }
        }
        const _c0 = function () {
          return { tab: 3 };
        };
        function MessagesComponent_div_12_tr_10_Template(rf, ctx) {
          if (rf & 1) {
            const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "tr",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              2,
              MessagesComponent_div_12_tr_10_div_2_Template,
              5,
              5,
              "div",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              3,
              MessagesComponent_div_12_tr_10_div_3_Template,
              5,
              5,
              "div",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](8, "timeago");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              9,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              10,
              "button",
              17
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function MessagesComponent_div_12_tr_10_Template_button_click_10_listener(
                $event
              ) {
                return $event.stopPropagation();
              }
            )(
              "click",
              function MessagesComponent_div_12_tr_10_Template_button_click_10_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r11
                );
                const message_r4 = ctx.$implicit;
                const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ](2);
                return ctx_r10.deleteMessage(message_r4.id);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              11,
              " Delete "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const message_r4 = ctx.$implicit;
            const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "routerLink",
              ctx_r3.container === "Outbox"
                ? "/members/" + message_r4.recipientUsername
                : "/members/" + message_r4.senderUsername
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "hidden",
              ctx_r3.loading
            )(
              "queryParams",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](
                9,
                _c0
              )
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              ctx_r3.container === "Outbox"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              ctx_r3.container !== "Outbox"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              message_r4.content
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                8,
                7,
                message_r4.messageSent
              )
            );
          }
        }
        function MessagesComponent_div_12_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "table",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "tr"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "th",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              4,
              "From / To"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "th",
              13
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Message");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              7,
              "th",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              8,
              "Sent / Received"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              9,
              "th",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              10,
              MessagesComponent_div_12_tr_10_Template,
              12,
              10,
              "tr",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngForOf",
              ctx_r1.messages
            );
          }
        }
        function MessagesComponent_div_13_Template(rf, ctx) {
          if (rf & 1) {
            const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "pagination",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MessagesComponent_div_13_Template_pagination_ngModelChange_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r13
                );
                const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r12.pagination.currentPage = $event);
              }
            )(
              "pageChanged",
              function MessagesComponent_div_13_Template_pagination_pageChanged_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r13
                );
                const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r14.pageChanged($event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "boundaryLinks",
              true
            )("totalItems", ctx_r2.pagination.totalItems)(
              "itemsPerPage",
              ctx_r2.pagination.itemsPerPage
            )("ngModel", ctx_r2.pagination.currentPage);
          }
        }
        class MessagesComponent {
          constructor(messageService, confirmService) {
            this.messageService = messageService;
            this.confirmService = confirmService;
            this.container = "Unread";
            this.pageNumber = 1;
            this.pageSize = 5;
            this.loading = false;
          }
          ngOnInit() {
            this.loadMessages();
          }
          loadMessages() {
            this.loading = true;
            this.messageService
              .getMessages(this.pageNumber, this.pageSize, this.container)
              .subscribe((response) => {
                this.messages = response.result;
                this.pagination = response.pagination;
                this.loading = false;
              });
          }
          deleteMessage(id) {
            this.confirmService
              .confirm("Confirm delete message", "This cannot be undone")
              .subscribe((result) => {
                if (result) {
                  this.messageService.deleteMessage(id).subscribe(() => {
                    this.messages.splice(
                      this.messages.findIndex((message) => message.id === id),
                      1
                    );
                  });
                }
              });
          }
          pageChanged(event) {
            this.pageNumber = event.page;
            this.loadMessages();
          }
        }
        MessagesComponent.ɵfac = function MessagesComponent_Factory(t) {
          return new (t || MessagesComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_message_service__WEBPACK_IMPORTED_MODULE_1__[
                "MessageService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_confirm_service__WEBPACK_IMPORTED_MODULE_2__[
                "ConfirmService"
              ]
            )
          );
        };
        MessagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MessagesComponent,
          selectors: [["app-messages"]],
          decls: 14,
          vars: 6,
          consts: [
            [1, "row", "mb-4"],
            ["name", "container", 1, "btn-group"],
            [
              "btnRadio",
              "Unread",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "ngModelChange",
              "click",
            ],
            [1, "fa", "fa-envelope"],
            [
              "btnRadio",
              "Inbox",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "ngModelChange",
              "click",
            ],
            [1, "fa", "fa-envelope-open"],
            [
              "btnRadio",
              "Outbox",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "ngModelChange",
              "click",
            ],
            [1, "fa", "fa-paper-plane"],
            ["class", "row", 4, "ngIf"],
            ["class", "d-flex justify-content-center", 4, "ngIf"],
            [1, "row"],
            [1, "table", "table-hover", 2, "cursor", "pointer"],
            [2, "width", "20%"],
            [2, "width", "40%"],
            [3, "hidden", "routerLink", "queryParams", 4, "ngFor", "ngForOf"],
            [3, "hidden", "routerLink", "queryParams"],
            [4, "ngIf"],
            [1, "btn", "btn-danger", 3, "click"],
            [1, "img-circle", "rounded-circle", "mr-2", 3, "src", "alt"],
            [1, "d-flex", "justify-content-center"],
            [
              "previousText",
              "\u2039",
              "nextText",
              "\u203A",
              "firstText",
              "\u00AB",
              "lastText",
              "\u00BB",
              3,
              "boundaryLinks",
              "totalItems",
              "itemsPerPage",
              "ngModel",
              "ngModelChange",
              "pageChanged",
            ],
          ],
          template: function MessagesComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "button",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MessagesComponent_Template_button_ngModelChange_2_listener(
                  $event
                ) {
                  return (ctx.container = $event);
                }
              )(
                "click",
                function MessagesComponent_Template_button_click_2_listener() {
                  return ctx.loadMessages();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                3,
                "i",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                4,
                " Unread "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                5,
                "button",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MessagesComponent_Template_button_ngModelChange_5_listener(
                  $event
                ) {
                  return (ctx.container = $event);
                }
              )(
                "click",
                function MessagesComponent_Template_button_click_5_listener() {
                  return ctx.loadMessages();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                6,
                "i",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                7,
                " Inbox "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                8,
                "button",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MessagesComponent_Template_button_ngModelChange_8_listener(
                  $event
                ) {
                  return (ctx.container = $event);
                }
              )(
                "click",
                function MessagesComponent_Template_button_click_8_listener() {
                  return ctx.loadMessages();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                9,
                "i",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                10,
                " Outbox "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                11,
                MessagesComponent_div_11_Template,
                3,
                0,
                "div",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                12,
                MessagesComponent_div_12_Template,
                11,
                1,
                "div",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                13,
                MessagesComponent_div_13_Template,
                2,
                4,
                "div",
                9
              );
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.container
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.container
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.container
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                (ctx.messages == null ? null : ctx.messages.length) === 0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                (ctx.messages == null ? null : ctx.messages.length) > 0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.pagination && !ctx.loading
              );
            }
          },
          directives: [
            ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_3__[
              "ButtonRadioDirective"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["NgModel"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterLink"],
            ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_7__[
              "PaginationComponent"
            ],
          ],
          pipes: [
            ngx_timeago__WEBPACK_IMPORTED_MODULE_8__["TimeagoPipe"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["TitleCasePipe"],
          ],
          styles: [
            ".img-circle[_ngcontent-%COMP%] {\n  max-height: 50px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVzc2FnZXMvbWVzc2FnZXMuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJzcmMvYXBwL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLWNpcmNsZSB7XG4gIG1heC1oZWlnaHQ6IDUwcHg7XG59XG4iXX0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MessagesComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-messages",
                      templateUrl: "./messages.component.html",
                      styleUrls: ["./messages.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_message_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MessageService"
                      ],
                  },
                  {
                    type:
                      _services_confirm_service__WEBPACK_IMPORTED_MODULE_2__[
                        "ConfirmService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ Hb5A:
      /*!******************************************!*\
  !*** ./src/app/services/busy.service.ts ***!
  \******************************************/
      /*! exports provided: BusyService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "BusyService",
          function () {
            return BusyService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ngx-spinner */ "JqCM"
        );

        class BusyService {
          constructor(spinnerService) {
            this.spinnerService = spinnerService;
            this.busyRequestCount = 0;
          }
          busy() {
            this.busyRequestCount++;
            this.spinnerService.show(undefined, {
              type: "line-scale-party",
              bdColor: "rgba(255,255,255,0)",
              color: "#333333",
            });
          }
          idle() {
            this.busyRequestCount--;
            if (this.busyRequestCount <= 0) {
              this.busyRequestCount = 0;
              this.spinnerService.hide();
            }
          }
        }
        BusyService.ɵfac = function BusyService_Factory(t) {
          return new (t || BusyService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_spinner__WEBPACK_IMPORTED_MODULE_1__["NgxSpinnerService"]
            )
          );
        };
        BusyService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: BusyService,
          factory: BusyService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              BusyService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      ngx_spinner__WEBPACK_IMPORTED_MODULE_1__[
                        "NgxSpinnerService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ OcPW:
      /*!********************************************************************!*\
  !*** ./src/app/admin/user-management/user-management.component.ts ***!
  \********************************************************************/
      /*! exports provided: UserManagementComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "UserManagementComponent",
          function () {
            return UserManagementComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var src_app_modals_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! src/app/modals/roles-modal/roles-modal.component */ "yNbP"
        );
        /* harmony import */ var src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! src/app/services/admin.service */ "AJ6+"
        );
        /* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-bootstrap/modal */ "LqlI"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        // Libs

        function UserManagementComponent_tr_8_Template(rf, ctx) {
          if (rf & 1) {
            const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "tr"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "button",
              5
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function UserManagementComponent_tr_8_Template_button_click_6_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r3
                );
                const user_r1 = ctx.$implicit;
                const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r2.openRolesModal(user_r1);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              7,
              " Edit Roles "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const user_r1 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              user_r1.userName
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              user_r1.roles
            );
          }
        }
        class UserManagementComponent {
          constructor(adminService, modalService) {
            this.adminService = adminService;
            this.modalService = modalService;
          }
          ngOnInit() {
            this.getUsersWithRoles();
          }
          getUsersWithRoles() {
            this.adminService.getUsersWithRoles().subscribe((users) => {
              this.users = users;
            });
          }
          openRolesModal(user) {
            const config = {
              class: "modal-dialog-centered",
              initialState: {
                user,
                roles: this.getRolesArray(user),
              },
            };
            this.bsModalRef = this.modalService.show(
              src_app_modals_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_1__[
                "RolesModalComponent"
              ],
              config
            );
            this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
              const rolesToUpdate = {
                roles: [
                  ...values
                    .filter((el) => el.checked === true)
                    .map((el) => el.name),
                ],
              };
              if (rolesToUpdate) {
                this.adminService
                  .updateUserRoles(user.userName, rolesToUpdate.roles)
                  .subscribe(() => {
                    user.roles = [...rolesToUpdate.roles];
                  });
              }
            });
          }
          getRolesArray(user) {
            const roles = [];
            const userRoles = user.roles;
            const availableRoles = [
              { name: "Admin", value: "Admin" },
              { name: "Moderator", value: "Moderator" },
              { name: "Member", value: "Member" },
            ];
            availableRoles.forEach((role) => {
              let isMatch = false;
              for (const userRole of userRoles) {
                if (role.name === userRole) {
                  isMatch = true;
                  role.checked = true;
                  roles.push(role);
                  break;
                }
              }
              if (!isMatch) {
                role.checked = false;
                roles.push(role);
              }
            });
            return roles;
          }
        }
        UserManagementComponent.ɵfac = function UserManagementComponent_Factory(
          t
        ) {
          return new (t || UserManagementComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__[
                "AdminService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__["BsModalService"]
            )
          );
        };
        UserManagementComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: UserManagementComponent,
          selectors: [["app-user-management"]],
          decls: 9,
          vars: 1,
          consts: [
            [1, "row"],
            [1, "table"],
            [2, "width", "30%"],
            [2, "width", "40%"],
            [4, "ngFor", "ngForOf"],
            [1, "btn", "btn-info", 3, "click"],
          ],
          template: function UserManagementComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "table",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "tr"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "th",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                4,
                "Username"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                5,
                "th",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                6,
                "Active Roles"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                7,
                "th",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                8,
                UserManagementComponent_tr_8_Template,
                8,
                2,
                "tr",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.users
              );
            }
          },
          directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"]],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL3VzZXItbWFuYWdlbWVudC91c2VyLW1hbmFnZW1lbnQuY29tcG9uZW50LmNzcyJ9 */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              UserManagementComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-user-management",
                      templateUrl: "./user-management.component.html",
                      styleUrls: ["./user-management.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_admin_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AdminService"
                      ],
                  },
                  {
                    type:
                      ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_3__[
                        "BsModalService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ PL33:
      /*!******************************************************************!*\
  !*** ./src/app/members/member-detail/member-detail.component.ts ***!
  \******************************************************************/
      /*! exports provided: MemberDetailComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberDetailComponent",
          function () {
            return MemberDetailComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @kolkov/ngx-gallery */ "XGsO"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! src/app/services/presence.service */ "2Oae"
        );
        /* harmony import */ var src_app_services_message_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! src/app/services/message.service */ "tZre"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! src/app/services/account.service */ "flj8"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ngx-bootstrap/tabs */ "44PX"
        );
        /* harmony import */ var _member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ../member-messages/member-messages.component */ "2qCV"
        );
        /* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! ngx-timeago */ "twue"
        );
        // Libs

        const _c0 = ["memberTabs"];
        function MemberDetailComponent_div_5_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "i", 20);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              " Online now "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        class MemberDetailComponent {
          constructor(presence, messageService, route, accountService, router) {
            this.presence = presence;
            this.messageService = messageService;
            this.route = route;
            this.accountService = accountService;
            this.router = router;
            this.messages = [];
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)
              )
              .subscribe((user) => (this.user = user));
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          }
          ngOnInit() {
            this.route.data.subscribe((data) => {
              this.member = data.member;
            });
            this.route.queryParams.subscribe((params) => {
              params.tab ? this.selectTab(params.tab) : this.selectTab(0);
            });
            this.galleryOptions = [
              {
                width: "500px",
                height: "500px",
                imagePercent: 100,
                thumbnailsColumns: 4,
                imageAnimation:
                  _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_1__[
                    "NgxGalleryAnimation"
                  ].Slide,
                preview: false,
              },
            ];
            this.galleryImages = this.getImages();
          }
          getImages() {
            const imageUrls = [];
            for (const photo of this.member.photos) {
              imageUrls.push({
                small: photo === null || photo === void 0 ? void 0 : photo.url,
                medium: photo === null || photo === void 0 ? void 0 : photo.url,
                big: photo === null || photo === void 0 ? void 0 : photo.url,
              });
            }
            return imageUrls;
          }
          loadMessages() {
            this.messageService
              .getMessageThread(this.member.username)
              .subscribe((messages) => {
                this.messages = messages;
              });
          }
          selectTab(tabId) {
            this.memberTabs.tabs[tabId].active = true;
          }
          onTabActivated(data) {
            this.activeTab = data;
            if (
              this.activeTab.heading === "Messages" &&
              this.messages.length === 0
            ) {
              this.messageService.createHubConnection(
                this.user,
                this.member.username
              );
            } else {
              this.messageService.stopHubConnection();
            }
          }
          ngOnDestroy() {
            this.messageService.stopHubConnection();
          }
        }
        MemberDetailComponent.ɵfac = function MemberDetailComponent_Factory(t) {
          return new (t || MemberDetailComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__[
                "PresenceService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_message_service__WEBPACK_IMPORTED_MODULE_4__[
                "MessageService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_5__["ActivatedRoute"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_account_service__WEBPACK_IMPORTED_MODULE_6__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]
            )
          );
        };
        MemberDetailComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MemberDetailComponent,
          selectors: [["app-member-detail"]],
          viewQuery: function MemberDetailComponent_Query(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 3);
            }
            if (rf & 2) {
              let _t;
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](
                (_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵloadQuery"
                ]())
              ) && (ctx.memberTabs = _t.first);
            }
          },
          decls: 56,
          vars: 21,
          consts: [
            [1, "row"],
            [1, "col-4"],
            [1, "card"],
            [1, "card-image-top", "img-thumbnail", 3, "src", "alt"],
            [1, "card-body"],
            ["class", "mb-2", 4, "ngIf"],
            [1, "card-footer"],
            [1, "btn-group", "d-flex"],
            [1, "btn", "btn-primary"],
            [1, "btn", "btn-success", 3, "click"],
            [1, "col-8"],
            [1, "member-tabset"],
            ["memberTabs", ""],
            [3, "heading", "selectTab"],
            ["heading", "Interests", 3, "selectTab"],
            ["heading", "Photos", 3, "selectTab"],
            [1, "ngx-gallery", 3, "options", "images"],
            ["heading", "Messages", 3, "selectTab"],
            [3, "username"],
            [1, "mb-2"],
            [1, "fa", "fa-user-circle", "text-success"],
          ],
          template: function MemberDetailComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                3,
                "img",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "div",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                5,
                MemberDetailComponent_div_5_Template,
                3,
                0,
                "div",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "div"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                8,
                "strong"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                9,
                "Location: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                12,
                "div"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                13,
                "strong"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Age: ");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                15,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                17,
                "div"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                18,
                "strong"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                19,
                "Last active: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                20,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](
                22,
                "timeago"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                23,
                "div"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                24,
                "strong"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                25,
                "Member since: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                26,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](28, "date");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                29,
                "div",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                30,
                "div",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                31,
                "button",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Like");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                33,
                "button",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function MemberDetailComponent_Template_button_click_33_listener() {
                  return ctx.selectTab(3);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                34,
                " Message "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                35,
                "div",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                36,
                "tabset",
                11,
                12
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                38,
                "tab",
                13
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "selectTab",
                function MemberDetailComponent_Template_tab_selectTab_38_listener(
                  $event
                ) {
                  return ctx.onTabActivated($event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                39,
                "h4"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                40,
                "Description"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                41,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                43,
                "h4"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                44,
                "Looking for"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                45,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                47,
                "tab",
                14
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "selectTab",
                function MemberDetailComponent_Template_tab_selectTab_47_listener(
                  $event
                ) {
                  return ctx.onTabActivated($event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                48,
                "h4"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                49,
                "Interests"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                50,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                52,
                "tab",
                15
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "selectTab",
                function MemberDetailComponent_Template_tab_selectTab_52_listener(
                  $event
                ) {
                  return ctx.onTabActivated($event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                53,
                "ngx-gallery",
                16
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                54,
                "tab",
                17
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "selectTab",
                function MemberDetailComponent_Template_tab_selectTab_54_listener(
                  $event
                ) {
                  return ctx.onTabActivated($event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                55,
                "app-member-messages",
                18
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ](
                "src",
                ctx.member.photoUrl || "./assets/user.png",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ]("alt", ctx.member.knownAs);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  6,
                  15,
                  ctx.presence.onlineUsers$
                ).includes(ctx.member.username)
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](
                "",
                ctx.member.city,
                ", ",
                ctx.member.country,
                ""
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.member.age
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  22,
                  17,
                  ctx.member.lastActive
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  28,
                  19,
                  ctx.member.created
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate1"
              ]("heading", "About ", ctx.member.knownAs, "");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.member.introduction
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.member.lookingFor
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.member.interests
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "options",
                ctx.galleryOptions
              )("images", ctx.galleryImages);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "username",
                ctx.member.username
              );
            }
          },
          directives: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_8__["TabsetComponent"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_8__["TabDirective"],
            _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_1__[
              "NgxGalleryComponent"
            ],
            _member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_9__[
              "MemberMessagesComponent"
            ],
          ],
          pipes: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["AsyncPipe"],
            ngx_timeago__WEBPACK_IMPORTED_MODULE_10__["TimeagoPipe"],
            _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"],
          ],
          styles: [
            ".img-thumbnail[_ngcontent-%COMP%] {\r\n  margin: 25px;\r\n  width: 85%;\r\n  height: 85%;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n  padding: 0 25px;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n  padding: 10px 15px;\r\n  background-color: #ffffff;\r\n  border-top: none;\r\n}\r\n\r\n.ngx-gallery[_ngcontent-%COMP%] {\r\n  display: inline-block;\r\n  margin-bottom: 20px;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZW1iZXItZGV0YWlsL21lbWJlci1kZXRhaWwuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQVk7RUFDWixVQUFVO0VBQ1YsV0FBVztBQUNiOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UscUJBQXFCO0VBQ3JCLG1CQUFtQjtBQUNyQiIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvbWVtYmVyLWRldGFpbC9tZW1iZXItZGV0YWlsLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLXRodW1ibmFpbCB7XHJcbiAgbWFyZ2luOiAyNXB4O1xyXG4gIHdpZHRoOiA4NSU7XHJcbiAgaGVpZ2h0OiA4NSU7XHJcbn1cclxuXHJcbi5jYXJkLWJvZHkge1xyXG4gIHBhZGRpbmc6IDAgMjVweDtcclxufVxyXG5cclxuLmNhcmQtZm9vdGVyIHtcclxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICBib3JkZXItdG9wOiBub25lO1xyXG59XHJcblxyXG4ubmd4LWdhbGxlcnkge1xyXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcbiJdfQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberDetailComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-member-detail",
                      templateUrl: "./member-detail.component.html",
                      styleUrls: ["./member-detail.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__[
                        "PresenceService"
                      ],
                  },
                  {
                    type:
                      src_app_services_message_service__WEBPACK_IMPORTED_MODULE_4__[
                        "MessageService"
                      ],
                  },
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_5__[
                        "ActivatedRoute"
                      ],
                  },
                  {
                    type:
                      src_app_services_account_service__WEBPACK_IMPORTED_MODULE_6__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
                  },
                ];
              },
              {
                memberTabs: [
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
                    args: ["memberTabs", { static: true }],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ Rv1c:
      /*!**************************************************************!*\
  !*** ./src/app/members/member-list/member-list.component.ts ***!
  \**************************************************************/
      /*! exports provided: MemberListComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberListComponent",
          function () {
            return MemberListComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! src/app/services/members.service */ "15gN"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ngx-bootstrap/buttons */ "s3T5"
        );
        /* harmony import */ var _member_card_member_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ../member-card/member-card.component */ "kntC"
        );
        /* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ngx-bootstrap/pagination */ "Lm2G"
        );
        // libs

        function MemberListComponent_option_18_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "option",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const gender_r4 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "value",
              gender_r4.value
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " ",
              gender_r4.display,
              " "
            );
          }
        }
        function MemberListComponent_div_30_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              1,
              "app-member-card",
              21
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const member_r5 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "member",
              member_r5
            );
          }
        }
        function MemberListComponent_div_31_Template(rf, ctx) {
          if (rf & 1) {
            const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              22
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "pagination",
              23
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberListComponent_div_31_Template_pagination_ngModelChange_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r7
                );
                const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r6.pagination.currentPage = $event);
              }
            )(
              "pageChanged",
              function MemberListComponent_div_31_Template_pagination_pageChanged_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r7
                );
                const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r8.pageChanged($event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "boundaryLinks",
              true
            )("totalItems", ctx_r3.pagination.totalItems)(
              "itemsPerPage",
              ctx_r3.pagination.itemsPerPage
            )("ngModel", ctx_r3.pagination.currentPage);
          }
        }
        class MemberListComponent {
          constructor(memberService) {
            this.memberService = memberService;
            this.genderList = [
              { value: "male", display: "Male" },
              { value: "female", display: "Female" },
            ];
            this.userParams = this.memberService.getUserParams();
          }
          ngOnInit() {
            this.loadMembers();
          }
          loadMembers() {
            this.memberService.setUserParams(this.userParams);
            this.memberService
              .getMembers(this.userParams)
              .subscribe((response) => {
                this.members = response.result;
                this.pagination = response.pagination;
              });
          }
          resetFilters() {
            this.userParams = this.memberService.resetUserParams();
            this.loadMembers();
          }
          pageChanged(event) {
            this.userParams.pageNumber = event.page;
            this.memberService.setUserParams(this.userParams);
            this.loadMembers();
          }
        }
        MemberListComponent.ɵfac = function MemberListComponent_Factory(t) {
          return new (t || MemberListComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                "MembersService"
              ]
            )
          );
        };
        MemberListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MemberListComponent,
          selectors: [["app-member-list"]],
          decls: 32,
          vars: 9,
          consts: [
            [1, "text-center", "mt-3"],
            [1, "container", "mt-3"],
            ["autocomplete", "off", 1, "form-inline", "mb-3", 3, "ngSubmit"],
            ["form", "ngForm"],
            [1, "form-group"],
            [
              "type",
              "number",
              "name",
              "minAge",
              1,
              "form-control",
              "ml-1",
              2,
              "width",
              "70px",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [1, "form-group", "px-2"],
            [
              "type",
              "number",
              "name",
              "maxAge",
              1,
              "form-control",
              "ml-1",
              2,
              "width",
              "70px",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [
              "name",
              "gender",
              1,
              "form-control",
              "ml-1",
              2,
              "width",
              "130px",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [3, "value", 4, "ngFor", "ngForOf"],
            ["type", "submit", 1, "btn", "btn-primary", "ml-1"],
            ["type", "submit", 1, "btn", "btn-info", "ml-1", 3, "click"],
            [1, "col"],
            [1, "btn-group", "float-right"],
            [
              "type",
              "button",
              "name",
              "orderBy",
              "btnRadio",
              "lastActive",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "click",
              "ngModelChange",
            ],
            [
              "type",
              "button",
              "name",
              "orderBy",
              "btnRadio",
              "created",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "click",
              "ngModelChange",
            ],
            [1, "row"],
            ["class", "col-2", 4, "ngFor", "ngForOf"],
            ["class", "d-flex justify-content-center", 4, "ngIf"],
            [3, "value"],
            [1, "col-2"],
            [3, "member"],
            [1, "d-flex", "justify-content-center"],
            [
              "previousText",
              "\u2039",
              "nextText",
              "\u203A",
              "firstText",
              "\u00AB",
              "lastText",
              "\u00BB",
              3,
              "boundaryLinks",
              "totalItems",
              "itemsPerPage",
              "ngModel",
              "ngModelChange",
              "pageChanged",
            ],
          ],
          template: function MemberListComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h2"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "form",
                2,
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngSubmit",
                function MemberListComponent_Template_form_ngSubmit_4_listener() {
                  return ctx.loadMembers();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "div",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "label"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                8,
                "Age from: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                9,
                "input",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MemberListComponent_Template_input_ngModelChange_9_listener(
                  $event
                ) {
                  return (ctx.userParams.minAge = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "div",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                11,
                "label"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                12,
                "Age to: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                13,
                "input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MemberListComponent_Template_input_ngModelChange_13_listener(
                  $event
                ) {
                  return (ctx.userParams.maxAge = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                14,
                "div",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                15,
                "label"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                16,
                "Show: "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                17,
                "select",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function MemberListComponent_Template_select_ngModelChange_17_listener(
                  $event
                ) {
                  return (ctx.userParams.gender = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                18,
                MemberListComponent_option_18_Template,
                2,
                2,
                "option",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                19,
                "button",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                20,
                "Apply Filters"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                21,
                "button",
                11
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function MemberListComponent_Template_button_click_21_listener() {
                  return ctx.resetFilters();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                22,
                " Reset Filters "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                23,
                "div",
                12
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                24,
                "div",
                13
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                25,
                "button",
                14
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function MemberListComponent_Template_button_click_25_listener() {
                  return ctx.loadMembers();
                }
              )(
                "ngModelChange",
                function MemberListComponent_Template_button_ngModelChange_25_listener(
                  $event
                ) {
                  return (ctx.userParams.orderBy = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                26,
                " Last Active "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                27,
                "button",
                15
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function MemberListComponent_Template_button_click_27_listener() {
                  return ctx.loadMembers();
                }
              )(
                "ngModelChange",
                function MemberListComponent_Template_button_ngModelChange_27_listener(
                  $event
                ) {
                  return (ctx.userParams.orderBy = $event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                28,
                " Newest Members "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                29,
                "div",
                16
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                30,
                MemberListComponent_div_30_Template,
                2,
                1,
                "div",
                17
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                31,
                MemberListComponent_div_31_Template,
                2,
                4,
                "div",
                18
              );
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
                "Your matches - ",
                ctx.pagination == null ? null : ctx.pagination.totalItems,
                " found"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.userParams.minAge
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.userParams.maxAge
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.userParams.gender
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.genderList
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.userParams.orderBy
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.userParams.orderBy
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.members
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.pagination
              );
            }
          },
          directives: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NumberValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__[
              "SelectControlValueAccessor"
            ],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"],
            ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_4__[
              "ButtonRadioDirective"
            ],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgSelectOption"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__[
              "ɵangular_packages_forms_forms_x"
            ],
            _member_card_member_card_component__WEBPACK_IMPORTED_MODULE_5__[
              "MemberCardComponent"
            ],
            ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_6__[
              "PaginationComponent"
            ],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvbWVtYmVyLWxpc3QvbWVtYmVyLWxpc3QuY29tcG9uZW50LmNzcyJ9 */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberListComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-member-list",
                      templateUrl: "./member-list.component.html",
                      styleUrls: ["./member-list.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MembersService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ "Rx+e":
      /*!*********************************************************!*\
  !*** ./src/app/guards/prevent-unsaved-changes.guard.ts ***!
  \*********************************************************/
      /*! exports provided: PreventUnsavedChangesGuard */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "PreventUnsavedChangesGuard",
          function () {
            return PreventUnsavedChangesGuard;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_confirm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../services/confirm.service */ "A9p3"
        );
        // Libs

        class PreventUnsavedChangesGuard {
          constructor(confirmService) {
            this.confirmService = confirmService;
          }
          canDeactivate(component) {
            if (component.editForm.dirty) {
              return this.confirmService.confirm();
            }
            return true;
          }
        }
        PreventUnsavedChangesGuard.ɵfac = function PreventUnsavedChangesGuard_Factory(
          t
        ) {
          return new (t || PreventUnsavedChangesGuard)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_confirm_service__WEBPACK_IMPORTED_MODULE_1__[
                "ConfirmService"
              ]
            )
          );
        };
        PreventUnsavedChangesGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: PreventUnsavedChangesGuard,
          factory: PreventUnsavedChangesGuard.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              PreventUnsavedChangesGuard,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_confirm_service__WEBPACK_IMPORTED_MODULE_1__[
                        "ConfirmService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ RzZf:
      /*!**************************************!*\
  !*** ./src/app/models/pagination.ts ***!
  \**************************************/
      /*! exports provided: PaginatedResult */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "PaginatedResult",
          function () {
            return PaginatedResult;
          }
        );
        class PaginatedResult {}

        /***/
      },

    /***/ Sy1n:
      /*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
      /*! exports provided: AppComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AppComponent",
          function () {
            return AppComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./services/account.service */ "flj8"
        );
        /* harmony import */ var _services_presence_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./services/presence.service */ "2Oae"
        );
        /* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-spinner */ "JqCM"
        );
        /* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./nav/nav.component */ "izVM"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        // libs

        class AppComponent {
          constructor(accountService, presence) {
            this.accountService = accountService;
            this.presence = presence;
            this.title = "The Dating App";
          }
          ngOnInit() {
            this.setCurrentUser();
          }
          setCurrentUser() {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
              this.accountService.setCurrentUser(user);
              this.presence.createHubConnection(user);
            }
          }
        }
        AppComponent.ɵfac = function AppComponent_Factory(t) {
          return new (t || AppComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_1__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_presence_service__WEBPACK_IMPORTED_MODULE_2__[
                "PresenceService"
              ]
            )
          );
        };
        AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: AppComponent,
          selectors: [["app-root"]],
          decls: 6,
          vars: 0,
          consts: [[1, "container", 2, "margin-top", "100px"]],
          template: function AppComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "ngx-spinner"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h3"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                2,
                "Loading..."
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                3,
                "app-nav"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                5,
                "router-outlet"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
          },
          directives: [
            ngx_spinner__WEBPACK_IMPORTED_MODULE_3__["NgxSpinnerComponent"],
            _nav_nav_component__WEBPACK_IMPORTED_MODULE_4__["NavComponent"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterOutlet"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AppComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-root",
                      templateUrl: "./app.component.html",
                      styleUrls: ["./app.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_1__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      _services_presence_service__WEBPACK_IMPORTED_MODULE_2__[
                        "PresenceService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ Tk1w:
      /*!***************************************!*\
  !*** ./src/app/guards/admin.guard.ts ***!
  \***************************************/
      /*! exports provided: AdminGuard */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AdminGuard",
          function () {
            return AdminGuard;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        // Libs

        class AdminGuard {
          constructor(accountService, toastr) {
            this.accountService = accountService;
            this.toastr = toastr;
          }
          canActivate() {
            return this.accountService.currentUser$.pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(
                (user) => {
                  if (
                    user.roles.includes("Admin") ||
                    user.roles.includes("Moderator")
                  ) {
                    return true;
                  }
                  this.toastr.error("You cannot enter this area");
                }
              )
            );
          }
        }
        AdminGuard.ɵfac = function AdminGuard_Factory(t) {
          return new (t || AdminGuard)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
            )
          );
        };
        AdminGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({ token: AdminGuard, factory: AdminGuard.ɵfac, providedIn: "root" });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AdminGuard,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ UTcu:
      /*!**************************************!*\
  !*** ./src/app/guards/auth.guard.ts ***!
  \**************************************/
      /*! exports provided: AuthGuard */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AuthGuard",
          function () {
            return AuthGuard;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        // libs

        class AuthGuard {
          constructor(accountService, toastr) {
            this.accountService = accountService;
            this.toastr = toastr;
          }
          canActivate() {
            return this.accountService.currentUser$.pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(
                (user) => {
                  if (user) {
                    return true;
                  }
                  this.toastr.error("You shall not pass!");
                }
              )
            );
          }
        }
        AuthGuard.ɵfac = function AuthGuard_Factory(t) {
          return new (t || AuthGuard)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"]
            )
          );
        };
        AuthGuard.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({ token: AuthGuard, factory: AuthGuard.ɵfac, providedIn: "root" });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AuthGuard,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ ZAI4:
      /*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
      /*! exports provided: AppModule */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AppModule",
          function () {
            return AppModule;
          }
        );
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/platform-browser */ "jhN1"
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );
        /* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/platform-browser/animations */ "R1ws"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ngx-spinner */ "JqCM"
        );
        /* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./app-routing.module */ "vY5A"
        );
        /* harmony import */ var _modules_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./modules/shared.module */ "jvDc"
        );
        /* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./app.component */ "Sy1n"
        );
        /* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ./nav/nav.component */ "izVM"
        );
        /* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! ./home/home.component */ "9vUh"
        );
        /* harmony import */ var _register_register_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! ./register/register.component */ "1W4x"
        );
        /* harmony import */ var _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! ./members/member-list/member-list.component */ "Rv1c"
        );
        /* harmony import */ var _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! ./members/member-detail/member-detail.component */ "PL33"
        );
        /* harmony import */ var _lists_lists_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          /*! ./lists/lists.component */ "hnRM"
        );
        /* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
          /*! ./messages/messages.component */ "DruN"
        );
        /* harmony import */ var _interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
          /*! ./interceptors/error.interceptor */ "t2gh"
        );
        /* harmony import */ var _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
          /*! ./errors/not-found/not-found.component */ "4rg4"
        );
        /* harmony import */ var _errors_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
          /*! ./errors/server-error/server-error.component */ "81j5"
        );
        /* harmony import */ var _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
          /*! ./members/member-card/member-card.component */ "kntC"
        );
        /* harmony import */ var _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
          /*! ./interceptors/jwt.interceptor */ "hzlp"
        );
        /* harmony import */ var _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
          /*! ./members/member-edit/member-edit.component */ "u2he"
        );
        /* harmony import */ var _interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
          /*! ./interceptors/loading.interceptor */ "cATB"
        );
        /* harmony import */ var _members_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
          /*! ./members/photo-editor/photo-editor.component */ "Zkt1"
        );
        /* harmony import */ var _forms_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
          /*! ./forms/text-input/text-input.component */ "3O32"
        );
        /* harmony import */ var _forms_date_input_date_input_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
          /*! ./forms/date-input/date-input.component */ "3gWd"
        );
        /* harmony import */ var _members_member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
          /*! ./members/member-messages/member-messages.component */ "2qCV"
        );
        /* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
          /*! ./admin/admin-panel/admin-panel.component */ "qPLm"
        );
        /* harmony import */ var _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
          /*! ./directives/has-role.directive */ "eXnd"
        );
        /* harmony import */ var _admin_user_management_user_management_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
          /*! ./admin/user-management/user-management.component */ "OcPW"
        );
        /* harmony import */ var _admin_photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
          /*! ./admin/photo-management/photo-management.component */ "4+ph"
        );
        /* harmony import */ var _modals_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(
          /*! ./modals/roles-modal/roles-modal.component */ "yNbP"
        );
        /* harmony import */ var _modals_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(
          /*! ./modals/confirm-dialog/confirm-dialog.component */ "vMgs"
        );
        // Libs

        // Modules

        // Components

        class AppModule {}
        AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__[
          "ɵɵdefineNgModule"
        ]({
          type: AppModule,
          bootstrap: [
            _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
          ],
        });
        AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__[
          "ɵɵdefineInjector"
        ]({
          factory: function AppModule_Factory(t) {
            return new (t || AppModule)();
          },
          providers: [
            {
              provide:
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                  "HTTP_INTERCEPTORS"
                ],
              useClass:
                _interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_16__[
                  "ErrorInterceptor"
                ],
              multi: true,
            },
            {
              provide:
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                  "HTTP_INTERCEPTORS"
                ],
              useClass:
                _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_20__[
                  "JwtInterceptor"
                ],
              multi: true,
            },
            {
              provide:
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                  "HTTP_INTERCEPTORS"
                ],
              useClass:
                _interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_22__[
                  "LoadingInterceptor"
                ],
              multi: true,
            },
          ],
          imports: [
            [
              _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                "BrowserModule"
              ],
              _app_routing_module__WEBPACK_IMPORTED_MODULE_6__[
                "AppRoutingModule"
              ],
              _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                "HttpClientModule"
              ],
              _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__[
                "BrowserAnimationsModule"
              ],
              _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
              _angular_forms__WEBPACK_IMPORTED_MODULE_4__[
                "ReactiveFormsModule"
              ],
              _modules_shared_module__WEBPACK_IMPORTED_MODULE_7__[
                "SharedModule"
              ],
              ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"],
            ],
          ],
        });
        (function () {
          (typeof ngJitMode === "undefined" || ngJitMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_1__[
              "ɵɵsetNgModuleScope"
            ](AppModule, {
              declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"],
                _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__["NavComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_10__[
                  "HomeComponent"
                ],
                _register_register_component__WEBPACK_IMPORTED_MODULE_11__[
                  "RegisterComponent"
                ],
                _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_12__[
                  "MemberListComponent"
                ],
                _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_13__[
                  "MemberDetailComponent"
                ],
                _lists_lists_component__WEBPACK_IMPORTED_MODULE_14__[
                  "ListsComponent"
                ],
                _messages_messages_component__WEBPACK_IMPORTED_MODULE_15__[
                  "MessagesComponent"
                ],
                _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_17__[
                  "NotFoundComponent"
                ],
                _errors_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_18__[
                  "ServerErrorComponent"
                ],
                _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_19__[
                  "MemberCardComponent"
                ],
                _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_21__[
                  "MemberEditComponent"
                ],
                _members_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_23__[
                  "PhotoEditorComponent"
                ],
                _forms_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_24__[
                  "TextInputComponent"
                ],
                _forms_date_input_date_input_component__WEBPACK_IMPORTED_MODULE_25__[
                  "DateInputComponent"
                ],
                _members_member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_26__[
                  "MemberMessagesComponent"
                ],
                _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_27__[
                  "AdminPanelComponent"
                ],
                _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_28__[
                  "HasRoleDirective"
                ],
                _admin_user_management_user_management_component__WEBPACK_IMPORTED_MODULE_29__[
                  "UserManagementComponent"
                ],
                _admin_photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_30__[
                  "PhotoManagementComponent"
                ],
                _modals_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_31__[
                  "RolesModalComponent"
                ],
                _modals_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_32__[
                  "ConfirmDialogComponent"
                ],
              ],
              imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                  "BrowserModule"
                ],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_6__[
                  "AppRoutingModule"
                ],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                  "HttpClientModule"
                ],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__[
                  "BrowserAnimationsModule"
                ],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__[
                  "ReactiveFormsModule"
                ],
                _modules_shared_module__WEBPACK_IMPORTED_MODULE_7__[
                  "SharedModule"
                ],
                ngx_spinner__WEBPACK_IMPORTED_MODULE_5__["NgxSpinnerModule"],
              ],
            });
        })();
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](
              AppModule,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
                  args: [
                    {
                      declarations: [
                        _app_component__WEBPACK_IMPORTED_MODULE_8__[
                          "AppComponent"
                        ],
                        _nav_nav_component__WEBPACK_IMPORTED_MODULE_9__[
                          "NavComponent"
                        ],
                        _home_home_component__WEBPACK_IMPORTED_MODULE_10__[
                          "HomeComponent"
                        ],
                        _register_register_component__WEBPACK_IMPORTED_MODULE_11__[
                          "RegisterComponent"
                        ],
                        _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_12__[
                          "MemberListComponent"
                        ],
                        _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_13__[
                          "MemberDetailComponent"
                        ],
                        _lists_lists_component__WEBPACK_IMPORTED_MODULE_14__[
                          "ListsComponent"
                        ],
                        _messages_messages_component__WEBPACK_IMPORTED_MODULE_15__[
                          "MessagesComponent"
                        ],
                        _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_17__[
                          "NotFoundComponent"
                        ],
                        _errors_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_18__[
                          "ServerErrorComponent"
                        ],
                        _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_19__[
                          "MemberCardComponent"
                        ],
                        _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_21__[
                          "MemberEditComponent"
                        ],
                        _members_photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_23__[
                          "PhotoEditorComponent"
                        ],
                        _forms_text_input_text_input_component__WEBPACK_IMPORTED_MODULE_24__[
                          "TextInputComponent"
                        ],
                        _forms_date_input_date_input_component__WEBPACK_IMPORTED_MODULE_25__[
                          "DateInputComponent"
                        ],
                        _members_member_messages_member_messages_component__WEBPACK_IMPORTED_MODULE_26__[
                          "MemberMessagesComponent"
                        ],
                        _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_27__[
                          "AdminPanelComponent"
                        ],
                        _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_28__[
                          "HasRoleDirective"
                        ],
                        _admin_user_management_user_management_component__WEBPACK_IMPORTED_MODULE_29__[
                          "UserManagementComponent"
                        ],
                        _admin_photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_30__[
                          "PhotoManagementComponent"
                        ],
                        _modals_roles_modal_roles_modal_component__WEBPACK_IMPORTED_MODULE_31__[
                          "RolesModalComponent"
                        ],
                        _modals_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_32__[
                          "ConfirmDialogComponent"
                        ],
                      ],
                      imports: [
                        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__[
                          "BrowserModule"
                        ],
                        _app_routing_module__WEBPACK_IMPORTED_MODULE_6__[
                          "AppRoutingModule"
                        ],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                          "HttpClientModule"
                        ],
                        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__[
                          "BrowserAnimationsModule"
                        ],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_4__[
                          "FormsModule"
                        ],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_4__[
                          "ReactiveFormsModule"
                        ],
                        _modules_shared_module__WEBPACK_IMPORTED_MODULE_7__[
                          "SharedModule"
                        ],
                        ngx_spinner__WEBPACK_IMPORTED_MODULE_5__[
                          "NgxSpinnerModule"
                        ],
                      ],
                      providers: [
                        {
                          provide:
                            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                              "HTTP_INTERCEPTORS"
                            ],
                          useClass:
                            _interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_16__[
                              "ErrorInterceptor"
                            ],
                          multi: true,
                        },
                        {
                          provide:
                            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                              "HTTP_INTERCEPTORS"
                            ],
                          useClass:
                            _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_20__[
                              "JwtInterceptor"
                            ],
                          multi: true,
                        },
                        {
                          provide:
                            _angular_common_http__WEBPACK_IMPORTED_MODULE_2__[
                              "HTTP_INTERCEPTORS"
                            ],
                          useClass:
                            _interceptors_loading_interceptor__WEBPACK_IMPORTED_MODULE_22__[
                              "LoadingInterceptor"
                            ],
                          multi: true,
                        },
                      ],
                      bootstrap: [
                        _app_component__WEBPACK_IMPORTED_MODULE_8__[
                          "AppComponent"
                        ],
                      ],
                    },
                  ],
                },
              ],
              null,
              null
            );
        })();

        /***/
      },

    /***/ Zkt1:
      /*!****************************************************************!*\
  !*** ./src/app/members/photo-editor/photo-editor.component.ts ***!
  \****************************************************************/
      /*! exports provided: PhotoEditorComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "PhotoEditorComponent",
          function () {
            return PhotoEditorComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ng2-file-upload */ "7pIB"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! src/app/services/account.service */ "flj8"
        );
        /* harmony import */ var src_app_services_members_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! src/app/services/members.service */ "15gN"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        // libs

        function PhotoEditorComponent_div_1_Template(rf, ctx) {
          if (rf & 1) {
            const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              9
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              1,
              "img",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "div",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "button",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function PhotoEditorComponent_div_1_Template_button_click_3_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const photo_r2 = ctx.$implicit;
                const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r3.setMainPhoto(photo_r2);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Main ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "button",
              13
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function PhotoEditorComponent_div_1_Template_button_click_5_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const photo_r2 = ctx.$implicit;
                const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r5.deletePhoto(photo_r2.id);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "i", 14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const photo_r2 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              photo_r2.url,
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              photo_r2.url
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              photo_r2.isMain
            )(
              "ngClass",
              photo_r2.isMain ? "btn-success active" : "btn-outline btn-success"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              photo_r2.isMain
            );
          }
        }
        function PhotoEditorComponent_div_14_tr_13_td_4_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "td",
              27
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "number");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const item_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]().$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              " ",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind2"](
                2,
                1,
                (item_r7 == null
                  ? null
                  : item_r7.file == null
                  ? null
                  : item_r7.file.size) /
                  1024 /
                  1024,
                ".2"
              ),
              " MB "
            );
          }
        }
        function PhotoEditorComponent_div_14_tr_13_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "tr"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "td"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              4,
              PhotoEditorComponent_div_14_tr_13_td_4_Template,
              3,
              4,
              "td",
              26
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const item_r7 = ctx.$implicit;
            const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              item_r7 == null
                ? null
                : item_r7.file == null
                ? null
                : item_r7.file.name
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              ctx_r6.uploader.options.isHTML5
            );
          }
        }
        const _c0 = function (a0) {
          return { width: a0 };
        };
        function PhotoEditorComponent_div_14_Template(rf, ctx) {
          if (rf & 1) {
            const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "h3"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              "Upload queue"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "table",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "thead"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              7,
              "tr"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              8,
              "th",
              17
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Name");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              10,
              "th"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Size");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              12,
              "tbody"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              13,
              PhotoEditorComponent_div_14_tr_13_Template,
              5,
              2,
              "tr",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              14,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              15,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              16,
              " Queue progress: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              17,
              "div",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              18,
              "div",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              19,
              "button",
              21
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function PhotoEditorComponent_div_14_Template_button_click_19_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r11
                );
                const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r10.uploader.uploadAll();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              20,
              "span",
              22
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              21,
              " Upload all "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              22,
              "button",
              23
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function PhotoEditorComponent_div_14_Template_button_click_22_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r11
                );
                const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r12.uploader.cancelAll();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              23,
              "span",
              24
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              24,
              " Cancel all "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              25,
              "button",
              25
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function PhotoEditorComponent_div_14_Template_button_click_25_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r11
                );
                const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r13.uploader.clearQueue();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              26,
              "span",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              27,
              " Remove all "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              "Queue length: ",
              ctx_r1.uploader == null
                ? null
                : ctx_r1.uploader.queue == null
                ? null
                : ctx_r1.uploader.queue.length,
              ""
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngForOf",
              ctx_r1.uploader.queue
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngStyle",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](
                6,
                _c0,
                ctx_r1.uploader.progress + "%"
              )
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              !ctx_r1.uploader.getNotUploadedItems().length
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              !ctx_r1.uploader.isUploading
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              !ctx_r1.uploader.queue.length
            );
          }
        }
        const _c1 = function (a0) {
          return { "nv-file-over": a0 };
        };
        class PhotoEditorComponent {
          constructor(accountService, membersService) {
            this.accountService = accountService;
            this.membersService = membersService;
            this.hasBaseDropZoneOver = false;
            this.baseUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_2__[
                "environment"
              ].apiUrl;
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)
              )
              .subscribe((user) => (this.user = user));
          }
          ngOnInit() {
            this.initializeUploader();
          }
          fileOverBase(event) {
            this.hasBaseDropZoneOver = event;
          }
          setMainPhoto(photo) {
            this.membersService.setMainPhoto(photo.id).subscribe(() => {
              this.user.photoUrl = photo.url;
              this.accountService.setCurrentUser(this.user);
              this.member.photoUrl = photo.url;
              this.member.photos.forEach((p) => {
                if (p.isMain) {
                  p.isMain = false;
                }
                if (photo.id === p.id) {
                  p.isMain = true;
                }
              });
            });
          }
          deletePhoto(photoId) {
            this.membersService.deletePhoto(photoId).subscribe(() => {
              this.member.photos = this.member.photos.filter(
                (photo) => photo.id !== photoId
              );
            });
          }
          initializeUploader() {
            this.uploader = new ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__[
              "FileUploader"
            ]({
              url: `${this.baseUrl}users/add-photo`,
              authToken: `Bearer ${this.user.token}`,
              isHTML5: true,
              allowedFileType: ["image"],
              removeAfterUpload: true,
              autoUpload: false,
              maxFileSize: 10 * 1024 * 1024,
            });
            this.uploader.onAfterAddingFile = (file) => {
              file.withCredentials = false;
            };
            this.uploader.onSuccessItem = (item, response, status, headers) => {
              if (response) {
                const photo = JSON.parse(response);
                this.member.photos.push(photo);
                if (photo.isMain) {
                  this.user.photoUrl = photo.url;
                  this.member.photoUrl = photo.url;
                  this.accountService.setCurrentUser(this.user);
                }
              }
            };
          }
        }
        PhotoEditorComponent.ɵfac = function PhotoEditorComponent_Factory(t) {
          return new (t || PhotoEditorComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_account_service__WEBPACK_IMPORTED_MODULE_4__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_members_service__WEBPACK_IMPORTED_MODULE_5__[
                "MembersService"
              ]
            )
          );
        };
        PhotoEditorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: PhotoEditorComponent,
          selectors: [["app-photo-editor"]],
          inputs: { member: "member" },
          decls: 15,
          vars: 8,
          consts: [
            [1, "row"],
            ["class", "col-2", 4, "ngFor", "ngForOf"],
            [1, "row", "mt-3"],
            [1, "col-md-3"],
            [
              "ng2FileDrop",
              "",
              1,
              "card",
              "bg-faded",
              "p-3",
              "text-center",
              "mb-3",
              "my-drop-zone",
              3,
              "ngClass",
              "uploader",
              "fileOver",
            ],
            [1, "fa", "fa-upload", "fa-3x"],
            [
              "type",
              "file",
              "ng2FileSelect",
              "",
              "multiple",
              "",
              3,
              "uploader",
            ],
            ["type", "file", "ng2FileSelect", "", 3, "uploader"],
            ["class", "col-md-9", "style", "margin-bottom: 40px", 4, "ngIf"],
            [1, "col-2"],
            [1, "img-thumbnail", "p-1", 3, "src", "alt"],
            [1, "text-center"],
            [1, "btn", "btn-sm", 3, "disabled", "ngClass", "click"],
            [1, "btn", "btn-sm", "btn-danger", 3, "disabled", "click"],
            [1, "fa", "fa-trash"],
            [1, "col-md-9", 2, "margin-bottom", "40px"],
            [1, "table"],
            ["width", "50%"],
            [4, "ngFor", "ngForOf"],
            [1, "progress"],
            ["role", "progressbar", 1, "progress-bar", 3, "ngStyle"],
            [
              "type",
              "button",
              1,
              "btn",
              "btn-success",
              "btn-s",
              3,
              "disabled",
              "click",
            ],
            [1, "fa", "fa-upload"],
            [
              "type",
              "button",
              1,
              "btn",
              "btn-warning",
              "btn-s",
              3,
              "disabled",
              "click",
            ],
            [1, "fa", "fa-ban"],
            [
              "type",
              "button",
              1,
              "btn",
              "btn-danger",
              "btn-s",
              3,
              "disabled",
              "click",
            ],
            ["nowrap", "", 4, "ngIf"],
            ["nowrap", ""],
          ],
          template: function PhotoEditorComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                1,
                PhotoEditorComponent_div_1_Template,
                7,
                5,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "div",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "h3"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                5,
                "Add photos"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "div",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "fileOver",
                function PhotoEditorComponent_Template_div_fileOver_6_listener(
                  $event
                ) {
                  return ctx.fileOverBase($event);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                7,
                "i",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                8,
                " Drop photos here "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                9,
                " Multiple "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                10,
                "input",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](11, "br");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                12,
                " Single "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                13,
                "input",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                14,
                PhotoEditorComponent_div_14_Template,
                28,
                8,
                "div",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.member.photos
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngClass",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](
                  6,
                  _c1,
                  ctx.hasBaseDropZoneOver
                )
              )("uploader", ctx.uploader);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "uploader",
                ctx.uploader
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "uploader",
                ctx.uploader
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.uploader == null
                  ? null
                  : ctx.uploader.queue == null
                  ? null
                  : ctx.uploader.queue.length
              );
            }
          },
          directives: [
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"],
            ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileDropDirective"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"],
            ng2_file_upload__WEBPACK_IMPORTED_MODULE_1__["FileSelectDirective"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgStyle"],
          ],
          pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["DecimalPipe"]],
          styles: [
            "img.img-thumbnail[_ngcontent-%COMP%] {\r\n  height: 100px;\r\n  min-width: 100px !important;\r\n  margin-bottom: 2px;\r\n}\r\n\r\n.nv-file-over[_ngcontent-%COMP%] {\r\n  border: dotted 3px red;\r\n}\r\n\r\ninput[type='file'][_ngcontent-%COMP%] {\r\n  color: transparent;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9waG90by1lZGl0b3IvcGhvdG8tZWRpdG9yLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsMkJBQTJCO0VBQzNCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQiIsImZpbGUiOiJzcmMvYXBwL21lbWJlcnMvcGhvdG8tZWRpdG9yL3Bob3RvLWVkaXRvci5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW1nLmltZy10aHVtYm5haWwge1xyXG4gIGhlaWdodDogMTAwcHg7XHJcbiAgbWluLXdpZHRoOiAxMDBweCAhaW1wb3J0YW50O1xyXG4gIG1hcmdpbi1ib3R0b206IDJweDtcclxufVxyXG5cclxuLm52LWZpbGUtb3ZlciB7XHJcbiAgYm9yZGVyOiBkb3R0ZWQgM3B4IHJlZDtcclxufVxyXG5cclxuaW5wdXRbdHlwZT0nZmlsZSddIHtcclxuICBjb2xvcjogdHJhbnNwYXJlbnQ7XHJcbn1cclxuIl19 */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              PhotoEditorComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-photo-editor",
                      templateUrl: "./photo-editor.component.html",
                      styleUrls: ["./photo-editor.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_account_service__WEBPACK_IMPORTED_MODULE_4__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      src_app_services_members_service__WEBPACK_IMPORTED_MODULE_5__[
                        "MembersService"
                      ],
                  },
                ];
              },
              {
                member: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ cATB:
      /*!*****************************************************!*\
  !*** ./src/app/interceptors/loading.interceptor.ts ***!
  \*****************************************************/
      /*! exports provided: LoadingInterceptor */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "LoadingInterceptor",
          function () {
            return LoadingInterceptor;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _services_busy_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/busy.service */ "Hb5A"
        );
        // libs

        class LoadingInterceptor {
          constructor(busyService) {
            this.busyService = busyService;
          }
          intercept(request, next) {
            this.busyService.busy();
            return next.handle(request).pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["finalize"])(
                () => {
                  this.busyService.idle();
                }
              )
            );
          }
        }
        LoadingInterceptor.ɵfac = function LoadingInterceptor_Factory(t) {
          return new (t || LoadingInterceptor)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_busy_service__WEBPACK_IMPORTED_MODULE_2__["BusyService"]
            )
          );
        };
        LoadingInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({ token: LoadingInterceptor, factory: LoadingInterceptor.ɵfac });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              LoadingInterceptor,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_busy_service__WEBPACK_IMPORTED_MODULE_2__[
                        "BusyService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ eXnd:
      /*!**************************************************!*\
  !*** ./src/app/directives/has-role.directive.ts ***!
  \**************************************************/
      /*! exports provided: HasRoleDirective */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "HasRoleDirective",
          function () {
            return HasRoleDirective;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        // Libs

        class HasRoleDirective {
          constructor(viewContainerRef, templateRef, accountService) {
            this.viewContainerRef = viewContainerRef;
            this.templateRef = templateRef;
            this.accountService = accountService;
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)
              )
              .subscribe((user) => {
                this.user = user;
              });
          }
          ngOnInit() {
            var _a, _b;
            if (
              !((_a = this.user) === null || _a === void 0
                ? void 0
                : _a.roles) ||
              this.user == null
            ) {
              this.viewContainerRef.clear();
              return;
            }
            if (
              (_b = this.user) === null || _b === void 0
                ? void 0
                : _b.roles.some((role) => this.appHasRole.includes(role))
            ) {
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
              this.viewContainerRef.clear();
            }
          }
        }
        HasRoleDirective.ɵfac = function HasRoleDirective_Factory(t) {
          return new (t || HasRoleDirective)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            )
          );
        };
        HasRoleDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineDirective"
        ]({
          type: HasRoleDirective,
          selectors: [["", "appHasRole", ""]],
          inputs: { appHasRole: "appHasRole" },
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              HasRoleDirective,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
                  args: [
                    {
                      selector: "[appHasRole]",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                        "ViewContainerRef"
                      ],
                  },
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"],
                  },
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                ];
              },
              {
                appHasRole: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ flj8:
      /*!*********************************************!*\
  !*** ./src/app/services/account.service.ts ***!
  \*********************************************/
      /*! exports provided: AccountService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AccountService",
          function () {
            return AccountService;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );
        /* harmony import */ var _presence_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./presence.service */ "2Oae"
        );

        class AccountService {
          constructor(http, presence) {
            this.http = http;
            this.presence = presence;
            this.baseUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_3__[
                "environment"
              ].apiUrl;
            this.currentUserSource = new rxjs__WEBPACK_IMPORTED_MODULE_1__[
              "ReplaySubject"
            ](1);
            this.currentUser$ = this.currentUserSource.asObservable();
          }
          login(model) {
            return this.http.post(this.baseUrl + "account/login", model).pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(
                (response) => {
                  const user = response;
                  if (user) {
                    this.setCurrentUser(user);
                    this.presence.createHubConnection(user);
                  }
                }
              )
            );
          }
          register(model) {
            return this.http
              .post(this.baseUrl + "account/register", model)
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(
                  (user) => {
                    if (user) {
                      this.setCurrentUser(user);
                      this.presence.createHubConnection(user);
                    }
                  }
                )
              );
          }
          setCurrentUser(user) {
            user.roles = [];
            const roles = this.getDecodedToken(user.token).role;
            Array.isArray(roles)
              ? (user.roles = roles)
              : user.roles.push(roles);
            localStorage.setItem("user", JSON.stringify(user));
            this.currentUserSource.next(user);
          }
          logout() {
            localStorage.removeItem("user");
            this.currentUserSource.next(null);
            this.presence.stopHubConnection();
          }
          getDecodedToken(token) {
            return JSON.parse(atob(token.split(".")[1]));
          }
        }
        AccountService.ɵfac = function AccountService_Factory(t) {
          return new (t || AccountService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _presence_service__WEBPACK_IMPORTED_MODULE_5__["PresenceService"]
            )
          );
        };
        AccountService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: AccountService,
          factory: AccountService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AccountService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_common_http__WEBPACK_IMPORTED_MODULE_4__[
                        "HttpClient"
                      ],
                  },
                  {
                    type:
                      _presence_service__WEBPACK_IMPORTED_MODULE_5__[
                        "PresenceService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ hnRM:
      /*!******************************************!*\
  !*** ./src/app/lists/lists.component.ts ***!
  \******************************************/
      /*! exports provided: ListsComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ListsComponent",
          function () {
            return ListsComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_members_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../services/members.service */ "15gN"
        );
        /* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ngx-bootstrap/buttons */ "s3T5"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ../members/member-card/member-card.component */ "kntC"
        );
        /* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ngx-bootstrap/pagination */ "Lm2G"
        );
        // libs

        function ListsComponent_div_11_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              9
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              1,
              "app-member-card",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const member_r2 = ctx.$implicit;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "member",
              member_r2
            );
          }
        }
        function ListsComponent_div_12_Template(rf, ctx) {
          if (rf & 1) {
            const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "pagination",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function ListsComponent_div_12_Template_pagination_ngModelChange_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r3.pagination.currentPage = $event);
              }
            )(
              "pageChanged",
              function ListsComponent_div_12_Template_pagination_pageChanged_1_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r5.pageChanged($event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "boundaryLinks",
              true
            )("totalItems", ctx_r1.pagination.totalItems)(
              "itemsPerPage",
              ctx_r1.pagination.itemsPerPage
            )("ngModel", ctx_r1.pagination.currentPage);
          }
        }
        class ListsComponent {
          constructor(memberService) {
            this.memberService = memberService;
            this.predicate = "liked";
            this.pageNumber = 1;
            this.pageSize = 5;
          }
          ngOnInit() {
            this.loadLikes();
          }
          loadLikes() {
            this.memberService
              .getLikes(this.predicate, this.pageNumber, this.pageSize)
              .subscribe((response) => {
                this.members = response.result;
                this.pagination = response.pagination;
              });
          }
          pageChanged(event) {
            this.pageNumber = event.page;
            this.loadLikes();
          }
        }
        ListsComponent.ɵfac = function ListsComponent_Factory(t) {
          return new (t || ListsComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                "MembersService"
              ]
            )
          );
        };
        ListsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: ListsComponent,
          selectors: [["app-lists"]],
          decls: 13,
          vars: 5,
          consts: [
            [1, "text-center", "mt-3"],
            [1, "container", "mt-3"],
            [1, "row"],
            ["name", "predicate", 1, "btn-group"],
            [
              "btnRadio",
              "liked",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "ngModelChange",
              "click",
            ],
            [
              "btnRadio",
              "likedBy",
              1,
              "btn",
              "btn-primary",
              3,
              "ngModel",
              "ngModelChange",
              "click",
            ],
            [1, "row", "mt-3"],
            ["class", "col-2", 4, "ngFor", "ngForOf"],
            ["class", "d-flex justify-content-center", 4, "ngIf"],
            [1, "col-2"],
            [3, "member"],
            [1, "d-flex", "justify-content-center"],
            [
              "previousText",
              "\u2039",
              "nextText",
              "\u203A",
              "firstText",
              "\u00AB",
              "lastText",
              "\u00BB",
              3,
              "boundaryLinks",
              "totalItems",
              "itemsPerPage",
              "ngModel",
              "ngModelChange",
              "pageChanged",
            ],
          ],
          template: function ListsComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h2"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                5,
                "div",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "button",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function ListsComponent_Template_button_ngModelChange_6_listener(
                  $event
                ) {
                  return (ctx.predicate = $event);
                }
              )(
                "click",
                function ListsComponent_Template_button_click_6_listener() {
                  return ctx.loadLikes();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                7,
                " Members I like "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                8,
                "button",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "ngModelChange",
                function ListsComponent_Template_button_ngModelChange_8_listener(
                  $event
                ) {
                  return (ctx.predicate = $event);
                }
              )(
                "click",
                function ListsComponent_Template_button_click_8_listener() {
                  return ctx.loadLikes();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                9,
                " Members who like me "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "div",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                11,
                ListsComponent_div_11_Template,
                2,
                1,
                "div",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                12,
                ListsComponent_div_12_Template,
                2,
                4,
                "div",
                8
              );
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
                " ",
                ctx.predicate === "liked"
                  ? "Members I like"
                  : "Members who liked me",
                " "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.predicate
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngModel",
                ctx.predicate
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.members
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.pagination
              );
            }
          },
          directives: [
            ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_2__[
              "ButtonRadioDirective"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"],
            _members_member_card_member_card_component__WEBPACK_IMPORTED_MODULE_5__[
              "MemberCardComponent"
            ],
            ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_6__[
              "PaginationComponent"
            ],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xpc3RzL2xpc3RzLmNvbXBvbmVudC5jc3MifQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              ListsComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-lists",
                      templateUrl: "./lists.component.html",
                      styleUrls: ["./lists.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MembersService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ hzlp:
      /*!*************************************************!*\
  !*** ./src/app/interceptors/jwt.interceptor.ts ***!
  \*************************************************/
      /*! exports provided: JwtInterceptor */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "JwtInterceptor",
          function () {
            return JwtInterceptor;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        // libs

        class JwtInterceptor {
          constructor(accountService) {
            this.accountService = accountService;
          }
          intercept(request, next) {
            let currentUser;
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)
              )
              .subscribe((user) => (currentUser = user));
            if (currentUser) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${currentUser.token}`,
                },
              });
            }
            return next.handle(request);
          }
        }
        JwtInterceptor.ɵfac = function JwtInterceptor_Factory(t) {
          return new (t || JwtInterceptor)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            )
          );
        };
        JwtInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({ token: JwtInterceptor, factory: JwtInterceptor.ɵfac });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              JwtInterceptor,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ izVM:
      /*!**************************************!*\
  !*** ./src/app/nav/nav.component.ts ***!
  \**************************************/
      /*! exports provided: NavComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "NavComponent",
          function () {
            return NavComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_account_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../services/account.service */ "flj8"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ../directives/has-role.directive */ "eXnd"
        );
        /* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ngx-bootstrap/dropdown */ "dZIy"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        // libs

        function NavComponent_ng_container_5_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵelementContainerStart"
            ](0);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "li",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "a",
              9
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Matches");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "li",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              5,
              "a",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Lists");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              7,
              "li",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              8,
              "a",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Messages");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵelementContainerEnd"
            ]();
          }
        }
        function NavComponent_li_7_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "li",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "a",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Admin");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function NavComponent_div_8_div_5_Template(rf, ctx) {
          if (rf & 1) {
            const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              17
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "a",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              "Edit Profile"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              3,
              "div",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "a",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "click",
              function NavComponent_div_8_div_5_Template_a_click_4_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r7
                );
                const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ](2);
                return ctx_r6.logout();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Logout");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function NavComponent_div_8_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              13
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "a",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](
              3,
              "titlecase"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              4,
              "img",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              5,
              NavComponent_div_8_div_5_Template,
              6,
              0,
              "div",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const user_r4 = ctx.ngIf;
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
              "Welcome ",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                3,
                3,
                user_r4.knownAs || user_r4.userName
              ),
              ""
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              user_r4.photoUrl ? user_r4.photoUrl : "../assets/user.png",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              user_r4.userName
            );
          }
        }
        function NavComponent_form_10_Template(rf, ctx) {
          if (rf & 1) {
            const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "form",
              21,
              22
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngSubmit",
              function NavComponent_form_10_Template_form_ngSubmit_0_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r10
                );
                const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r9.login();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "input",
              23
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function NavComponent_form_10_Template_input_ngModelChange_2_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r10
                );
                const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r11.model.username = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              3,
              "input",
              24
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function NavComponent_form_10_Template_input_ngModelChange_3_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r10
                );
                const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r12.model.password = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "button",
              25
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Login");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r3.model.username
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r3.model.password
            );
          }
        }
        const _c0 = function () {
          return ["Admin", "Moderator"];
        };
        class NavComponent {
          constructor(accountService, router) {
            this.accountService = accountService;
            this.router = router;
            this.model = {};
          }
          ngOnInit() {}
          login() {
            this.accountService.login(this.model).subscribe((response) => {
              this.router.navigateByUrl("/members");
            });
          }
          logout() {
            this.accountService.logout();
            this.router.navigateByUrl("/");
          }
        }
        NavComponent.ɵfac = function NavComponent_Factory(t) {
          return new (t || NavComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _services_account_service__WEBPACK_IMPORTED_MODULE_1__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
            )
          );
        };
        NavComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: NavComponent,
          selectors: [["app-nav"]],
          decls: 12,
          vars: 11,
          consts: [
            [
              1,
              "navbar",
              "navbar-expand-md",
              "navbar-dark",
              "fixed-top",
              "bg-primary",
            ],
            [1, "container"],
            ["routerLink", "/", 1, "navbar-brand"],
            [1, "navbar-nav", "mr-auto"],
            [4, "ngIf"],
            ["class", "nav-item", 4, "appHasRole"],
            ["class", "dropdown", "dropdown", "", 4, "ngIf"],
            [
              "class",
              "form-inline mt-2 mt-md-0",
              "autocomplete",
              "off",
              3,
              "ngSubmit",
              4,
              "ngIf",
            ],
            [1, "nav-item"],
            [
              "routerLink",
              "/members",
              "routerLinkActive",
              "active",
              1,
              "nav-link",
            ],
            [
              "routerLink",
              "/lists",
              "routerLinkActive",
              "active",
              1,
              "nav-link",
            ],
            [
              "routerLink",
              "/messages",
              "routerLinkActive",
              "active",
              1,
              "nav-link",
            ],
            [
              "routerLink",
              "/admin",
              "routerLinkActive",
              "active",
              1,
              "nav-link",
            ],
            ["dropdown", "", 1, "dropdown"],
            ["dropdownToggle", "", 1, "dropdown-toggle", "text-light", "mr-2"],
            [3, "src", "alt"],
            ["class", "dropdown-menu mt-3", 4, "dropdownMenu"],
            [1, "dropdown-menu", "mt-3"],
            ["routerLink", "/member/edit", 1, "dropdown-item"],
            [1, "dropdown-divider"],
            [1, "dropdown-item", 3, "click"],
            [
              "autocomplete",
              "off",
              1,
              "form-inline",
              "mt-2",
              "mt-md-0",
              3,
              "ngSubmit",
            ],
            ["loginForm", "ngForm"],
            [
              "name",
              "username",
              "type",
              "text",
              "placeholder",
              "Username",
              1,
              "form-control",
              "mr-sm-2",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [
              "name",
              "password",
              "type",
              "password",
              "placeholder",
              "Password",
              1,
              "form-control",
              "mr-sm-2",
              3,
              "ngModel",
              "ngModelChange",
            ],
            ["type", "submit", 1, "btn", "btn-success", "my-2", "my-sm-0"],
          ],
          template: function NavComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "nav",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "a",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                3,
                "Dating App"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "ul",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                5,
                NavComponent_ng_container_5_Template,
                10,
                0,
                "ng-container",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](6, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                7,
                NavComponent_li_7_Template,
                3,
                0,
                "li",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                8,
                NavComponent_div_8_Template,
                6,
                5,
                "div",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](9, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                10,
                NavComponent_form_10_Template,
                6,
                2,
                "form",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  6,
                  4,
                  ctx.accountService.currentUser$
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "appHasRole",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](
                  10,
                  _c0
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  9,
                  6,
                  ctx.accountService.currentUser$
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  11,
                  8,
                  ctx.accountService.currentUser$
                ) === null
              );
            }
          },
          directives: [
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"],
            _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_4__[
              "HasRoleDirective"
            ],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkActive"],
            ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__[
              "BsDropdownDirective"
            ],
            ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__[
              "BsDropdownToggleDirective"
            ],
            ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_5__[
              "BsDropdownMenuDirective"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"],
          ],
          pipes: [
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["TitleCasePipe"],
          ],
          styles: [
            ".dropdown-toggle[_ngcontent-%COMP%], .dropdown-item[_ngcontent-%COMP%] {\r\n  cursor: pointer;\r\n}\r\n\r\nimg[_ngcontent-%COMP%] {\r\n  max-height: 50px;\r\n  border: 2px solid #fff;\r\n  display: inline;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbmF2L25hdi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOztFQUVFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsc0JBQXNCO0VBQ3RCLGVBQWU7QUFDakIiLCJmaWxlIjoic3JjL2FwcC9uYXYvbmF2LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZHJvcGRvd24tdG9nZ2xlLFxyXG4uZHJvcGRvd24taXRlbSB7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG5pbWcge1xyXG4gIG1heC1oZWlnaHQ6IDUwcHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgI2ZmZjtcclxuICBkaXNwbGF5OiBpbmxpbmU7XHJcbn1cclxuIl19 */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              NavComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-nav",
                      templateUrl: "./nav.component.html",
                      styleUrls: ["./nav.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_account_service__WEBPACK_IMPORTED_MODULE_1__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ jvDc:
      /*!******************************************!*\
  !*** ./src/app/modules/shared.module.ts ***!
  \******************************************/
      /*! exports provided: SharedModule */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "SharedModule",
          function () {
            return SharedModule;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ngx-bootstrap/dropdown */ "dZIy"
        );
        /* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ngx-bootstrap/tabs */ "44PX"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        /* harmony import */ var _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @kolkov/ngx-gallery */ "XGsO"
        );
        /* harmony import */ var ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ng2-file-upload */ "7pIB"
        );
        /* harmony import */ var ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ngx-bootstrap/datepicker */ "hzby"
        );
        /* harmony import */ var ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ngx-bootstrap/pagination */ "Lm2G"
        );
        /* harmony import */ var ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ngx-bootstrap/buttons */ "s3T5"
        );
        /* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! ngx-timeago */ "twue"
        );
        /* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! ngx-bootstrap/modal */ "LqlI"
        );
        // libs

        class SharedModule {}
        SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineNgModule"
        ]({ type: SharedModule });
        SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjector"
        ]({
          factory: function SharedModule_Factory(t) {
            return new (t || SharedModule)();
          },
          imports: [
            [
              _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
              ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
                "BsDropdownModule"
              ].forRoot(),
              ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"].forRoot({
                positionClass: "toast-bottom-right",
              }),
              ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__[
                "TabsModule"
              ].forRoot(),
              _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
                "NgxGalleryModule"
              ],
              ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__["FileUploadModule"],
              ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
                "BsDatepickerModule"
              ].forRoot(),
              ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
                "PaginationModule"
              ].forRoot(),
              ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__[
                "ButtonsModule"
              ].forRoot(),
              ngx_timeago__WEBPACK_IMPORTED_MODULE_10__[
                "TimeagoModule"
              ].forRoot(),
              ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__[
                "ModalModule"
              ].forRoot(),
            ],
            ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
              "BsDropdownModule"
            ],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__["TabsModule"],
            _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
              "NgxGalleryModule"
            ],
            ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__["FileUploadModule"],
            ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
              "BsDatepickerModule"
            ],
            ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
              "PaginationModule"
            ],
            ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__["ButtonsModule"],
            ngx_timeago__WEBPACK_IMPORTED_MODULE_10__["TimeagoModule"],
            ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["ModalModule"],
          ],
        });
        (function () {
          (typeof ngJitMode === "undefined" || ngJitMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵsetNgModuleScope"
            ](SharedModule, {
              imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
                  "BsDropdownModule"
                ],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"],
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__["TabsModule"],
                _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
                  "NgxGalleryModule"
                ],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__[
                  "FileUploadModule"
                ],
                ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
                  "BsDatepickerModule"
                ],
                ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
                  "PaginationModule"
                ],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__[
                  "ButtonsModule"
                ],
                ngx_timeago__WEBPACK_IMPORTED_MODULE_10__["TimeagoModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__[
                  "ModalModule"
                ],
              ],
              exports: [
                ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
                  "BsDropdownModule"
                ],
                ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"],
                ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__["TabsModule"],
                _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
                  "NgxGalleryModule"
                ],
                ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__[
                  "FileUploadModule"
                ],
                ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
                  "BsDatepickerModule"
                ],
                ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
                  "PaginationModule"
                ],
                ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__[
                  "ButtonsModule"
                ],
                ngx_timeago__WEBPACK_IMPORTED_MODULE_10__["TimeagoModule"],
                ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__[
                  "ModalModule"
                ],
              ],
            });
        })();
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              SharedModule,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
                  args: [
                    {
                      declarations: [],
                      imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__[
                          "CommonModule"
                        ],
                        ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
                          "BsDropdownModule"
                        ].forRoot(),
                        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__[
                          "ToastrModule"
                        ].forRoot({
                          positionClass: "toast-bottom-right",
                        }),
                        ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__[
                          "TabsModule"
                        ].forRoot(),
                        _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
                          "NgxGalleryModule"
                        ],
                        ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__[
                          "FileUploadModule"
                        ],
                        ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
                          "BsDatepickerModule"
                        ].forRoot(),
                        ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
                          "PaginationModule"
                        ].forRoot(),
                        ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__[
                          "ButtonsModule"
                        ].forRoot(),
                        ngx_timeago__WEBPACK_IMPORTED_MODULE_10__[
                          "TimeagoModule"
                        ].forRoot(),
                        ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__[
                          "ModalModule"
                        ].forRoot(),
                      ],
                      exports: [
                        ngx_bootstrap_dropdown__WEBPACK_IMPORTED_MODULE_2__[
                          "BsDropdownModule"
                        ],
                        ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrModule"],
                        ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_3__[
                          "TabsModule"
                        ],
                        _kolkov_ngx_gallery__WEBPACK_IMPORTED_MODULE_5__[
                          "NgxGalleryModule"
                        ],
                        ng2_file_upload__WEBPACK_IMPORTED_MODULE_6__[
                          "FileUploadModule"
                        ],
                        ngx_bootstrap_datepicker__WEBPACK_IMPORTED_MODULE_7__[
                          "BsDatepickerModule"
                        ],
                        ngx_bootstrap_pagination__WEBPACK_IMPORTED_MODULE_8__[
                          "PaginationModule"
                        ],
                        ngx_bootstrap_buttons__WEBPACK_IMPORTED_MODULE_9__[
                          "ButtonsModule"
                        ],
                        ngx_timeago__WEBPACK_IMPORTED_MODULE_10__[
                          "TimeagoModule"
                        ],
                        ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__[
                          "ModalModule"
                        ],
                      ],
                    },
                  ],
                },
              ],
              null,
              null
            );
        })();

        /***/
      },

    /***/ kntC:
      /*!**************************************************************!*\
  !*** ./src/app/members/member-card/member-card.component.ts ***!
  \**************************************************************/
      /*! exports provided: MemberCardComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberCardComponent",
          function () {
            return MemberCardComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! src/app/services/members.service */ "15gN"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        /* harmony import */ var src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! src/app/services/presence.service */ "2Oae"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        // Libs

        const _c0 = function () {
          return { tab: 3 };
        };
        class MemberCardComponent {
          constructor(memberService, toastr, presence) {
            this.memberService = memberService;
            this.toastr = toastr;
            this.presence = presence;
          }
          ngOnInit() {}
          addLike(member) {
            this.memberService.addLike(member.username).subscribe(() => {
              this.toastr.success(`You have liked ${member.knownAs}`);
            });
          }
        }
        MemberCardComponent.ɵfac = function MemberCardComponent_Factory(t) {
          return new (t || MemberCardComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                "MembersService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__[
                "PresenceService"
              ]
            )
          );
        };
        MemberCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MemberCardComponent,
          selectors: [["app-member-card"]],
          inputs: { member: "member" },
          decls: 21,
          vars: 13,
          consts: [
            [1, "card", "mb-4"],
            [1, "card-img-wrapper"],
            [1, "card-img-top", 3, "src", "alt"],
            [1, "list-inline", "member-icons", "animate", "text-center"],
            [1, "list-inline-item"],
            [1, "btn", "btn-primary", 3, "routerLink"],
            [1, "fa", "fa-user"],
            [1, "btn", "btn-primary", 3, "click"],
            [1, "fa", "fa-heart"],
            [1, "btn", "btn-primary", 3, "routerLink", "queryParams"],
            [1, "fa", "fa-envelope"],
            [1, "card-body", "p-1"],
            [1, "card-title", "text-center", "mb-1"],
            [1, "fa", "fa-user", "mr-2"],
            [1, "card-text", "text-muted", "text-center"],
          ],
          template: function MemberCardComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "div",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                2,
                "img",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "ul",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "li",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                5,
                "button",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                6,
                "i",
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "li",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                8,
                "button",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function MemberCardComponent_Template_button_click_8_listener() {
                  return ctx.addLike(ctx.member);
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                9,
                "i",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "li",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                11,
                "button",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                12,
                "i",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                13,
                "div",
                11
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                14,
                "h6",
                12
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                15,
                "span"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](16, "async");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
                17,
                "i",
                13
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                19,
                "p",
                14
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ](
                "src",
                ctx.member.photoUrl || "./assets/user.png",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate"
              ]("alt", ctx.member.knownAs);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate1"
              ]("routerLink", "/members/", ctx.member.username, "");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                "ɵɵpropertyInterpolate1"
              ]("routerLink", "/members/", ctx.member.username, "");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "queryParams",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](
                  12,
                  _c0
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"](
                "is-online",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                  16,
                  10,
                  ctx.presence.onlineUsers$
                ).includes(ctx.member.username)
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](
                " ",
                ctx.member.knownAs,
                ", ",
                ctx.member.age,
                " "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.member.city
              );
            }
          },
          directives: [
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterLink"],
          ],
          pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]],
          styles: [
            ".card[_ngcontent-%COMP%]:hover   img[_ngcontent-%COMP%] {\n  transform: scale(1.2, 1.2);\n  transition-duration: 500ms;\n  transition-timing-function: ease-out;\n  opacity: 0.7;\n}\n\n.card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  transform: scale(1, 1);\n  transition-duration: 500ms;\n  transition-timing-function: ease-out;\n}\n\n.card-img-wrapper[_ngcontent-%COMP%] {\n  overflow: hidden;\n  position: relative;\n}\n\n.member-icons[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -30%;\n  left: 0;\n  right: 0;\n  margin-right: auto;\n  margin-left: auto;\n  opacity: 0;\n}\n\n.card-img-wrapper[_ngcontent-%COMP%]:hover   .member-icons[_ngcontent-%COMP%] {\n  bottom: 0;\n  opacity: 1;\n}\n\n.animate[_ngcontent-%COMP%] {\n  transition: all 0.3s ease-in-out;\n}\n\n@keyframes fa-blink {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0.4;\n  }\n}\n\n.is-online[_ngcontent-%COMP%] {\n  animation: fa-blink 1.5s linear infinite;\n  color: rgb(1, 189, 42);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZW1iZXItY2FyZC9tZW1iZXItY2FyZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsMEJBQTBCO0VBQzFCLDBCQUEwQjtFQUMxQixvQ0FBb0M7RUFDcEMsWUFBWTtBQUNkOztBQUVBO0VBQ0Usc0JBQXNCO0VBQ3RCLDBCQUEwQjtFQUMxQixvQ0FBb0M7QUFDdEM7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLFlBQVk7RUFDWixPQUFPO0VBQ1AsUUFBUTtFQUNSLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFO0lBQ0UsVUFBVTtFQUNaO0VBQ0E7SUFDRSxZQUFZO0VBQ2Q7QUFDRjs7QUFFQTtFQUNFLHdDQUF3QztFQUN4QyxzQkFBc0I7QUFDeEIiLCJmaWxlIjoic3JjL2FwcC9tZW1iZXJzL21lbWJlci1jYXJkL21lbWJlci1jYXJkLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZDpob3ZlciBpbWcge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMiwgMS4yKTtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogNTAwbXM7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4uY2FyZCBpbWcge1xuICB0cmFuc2Zvcm06IHNjYWxlKDEsIDEpO1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiA1MDBtcztcbiAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xufVxuXG4uY2FyZC1pbWctd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm1lbWJlci1pY29ucyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtMzAlO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgb3BhY2l0eTogMDtcbn1cblxuLmNhcmQtaW1nLXdyYXBwZXI6aG92ZXIgLm1lbWJlci1pY29ucyB7XG4gIGJvdHRvbTogMDtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmFuaW1hdGUge1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcbn1cblxuQGtleWZyYW1lcyBmYS1ibGluayB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxufVxuXG4uaXMtb25saW5lIHtcbiAgYW5pbWF0aW9uOiBmYS1ibGluayAxLjVzIGxpbmVhciBpbmZpbml0ZTtcbiAgY29sb3I6IHJnYigxLCAxODksIDQyKTtcbn1cbiJdfQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberCardComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-member-card",
                      templateUrl: "./member-card.component.html",
                      styleUrls: ["./member-card.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MembersService"
                      ],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"],
                  },
                  {
                    type:
                      src_app_services_presence_service__WEBPACK_IMPORTED_MODULE_3__[
                        "PresenceService"
                      ],
                  },
                ];
              },
              {
                member: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ mqOd:
      /*!*****************************************************!*\
  !*** ./src/app/resolvers/member-detail.resolver.ts ***!
  \*****************************************************/
      /*! exports provided: MemberDetailResolver */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberDetailResolver",
          function () {
            return MemberDetailResolver;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _services_members_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ../services/members.service */ "15gN"
        );
        // Libs

        class MemberDetailResolver {
          constructor(memberService) {
            this.memberService = memberService;
          }
          resolve(route) {
            return this.memberService.getMember(route.paramMap.get("username"));
          }
        }
        MemberDetailResolver.ɵfac = function MemberDetailResolver_Factory(t) {
          return new (t || MemberDetailResolver)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                "MembersService"
              ]
            )
          );
        };
        MemberDetailResolver.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({
          token: MemberDetailResolver,
          factory: MemberDetailResolver.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberDetailResolver,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _services_members_service__WEBPACK_IMPORTED_MODULE_1__[
                        "MembersService"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ qPLm:
      /*!************************************************************!*\
  !*** ./src/app/admin/admin-panel/admin-panel.component.ts ***!
  \************************************************************/
      /*! exports provided: AdminPanelComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AdminPanelComponent",
          function () {
            return AdminPanelComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ngx-bootstrap/tabs */ "44PX"
        );
        /* harmony import */ var _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ../../directives/has-role.directive */ "eXnd"
        );
        /* harmony import */ var _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ../user-management/user-management.component */ "OcPW"
        );
        /* harmony import */ var _photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ../photo-management/photo-management.component */ "4+ph"
        );

        function AdminPanelComponent_tab_4_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "tab",
              4
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "div",
              5
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              2,
              "app-user-management"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function AdminPanelComponent_tab_5_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "tab",
              6
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "div",
              5
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              2,
              "app-photo-management"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        const _c0 = function () {
          return ["Admin"];
        };
        const _c1 = function () {
          return ["Admin", "Moderator"];
        };
        class AdminPanelComponent {
          constructor() {}
          ngOnInit() {}
        }
        AdminPanelComponent.ɵfac = function AdminPanelComponent_Factory(t) {
          return new (t || AdminPanelComponent)();
        };
        AdminPanelComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: AdminPanelComponent,
          selectors: [["app-admin-panel"]],
          decls: 6,
          vars: 4,
          consts: [
            [1, "tab-panel"],
            [1, "member-tabset"],
            ["heading", "User management", 4, "appHasRole"],
            ["heading", "Photo management", 4, "appHasRole"],
            ["heading", "User management"],
            [1, "container"],
            ["heading", "Photo management"],
          ],
          template: function AdminPanelComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "h2"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                1,
                "Admin Panel"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                2,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "tabset",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                4,
                AdminPanelComponent_tab_4_Template,
                3,
                0,
                "tab",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                5,
                AdminPanelComponent_tab_5_Template,
                3,
                0,
                "tab",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "appHasRole",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](
                  2,
                  _c0
                )
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "appHasRole",
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](
                  3,
                  _c1
                )
              );
            }
          },
          directives: [
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_1__["TabsetComponent"],
            _directives_has_role_directive__WEBPACK_IMPORTED_MODULE_2__[
              "HasRoleDirective"
            ],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_1__["TabDirective"],
            _user_management_user_management_component__WEBPACK_IMPORTED_MODULE_3__[
              "UserManagementComponent"
            ],
            _photo_management_photo_management_component__WEBPACK_IMPORTED_MODULE_4__[
              "PhotoManagementComponent"
            ],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FkbWluL2FkbWluLXBhbmVsL2FkbWluLXBhbmVsLmNvbXBvbmVudC5jc3MifQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AdminPanelComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-admin-panel",
                      templateUrl: "./admin-panel.component.html",
                      styleUrls: ["./admin-panel.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [];
              },
              null
            );
        })();

        /***/
      },

    /***/ t2gh:
      /*!***************************************************!*\
  !*** ./src/app/interceptors/error.interceptor.ts ***!
  \***************************************************/
      /*! exports provided: ErrorInterceptor */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ErrorInterceptor",
          function () {
            return ErrorInterceptor;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );

        class ErrorInterceptor {
          constructor(router, toastr) {
            this.router = router;
            this.toastr = toastr;
          }
          intercept(request, next) {
            return next.handle(request).pipe(
              Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(
                (error) => {
                  if (error) {
                    switch (error.status) {
                      case 400:
                        if (error.error.errors) {
                          const modalStateErrors = [];
                          for (const key in error.error.errors) {
                            if (error.error.errors[key]) {
                              modalStateErrors.push(error.error.errors[key]);
                            }
                          }
                          throw modalStateErrors.flat();
                        } else if (typeof error.error === "object") {
                          this.toastr.error(error.statusText, error.status);
                        } else {
                          this.toastr.error(error.error, error.status);
                        }
                        break;
                      case 401:
                        this.toastr.error(error.statusText, error.status);
                        break;
                      case 404:
                        this.router.navigateByUrl("/not-found");
                        break;
                      case 500:
                        const navigationExtras = {
                          state: { error: error.error },
                        };
                        this.router.navigateByUrl(
                          "/server-error",
                          navigationExtras
                        );
                        break;
                      default:
                        this.toastr.error("Something unexpected went wrong!");
                        console.log(error);
                        break;
                    }
                  }
                  return Object(
                    rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"]
                  )(error);
                }
              )
            );
          }
        }
        ErrorInterceptor.ɵfac = function ErrorInterceptor_Factory(t) {
          return new (t || ErrorInterceptor)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]
            )
          );
        };
        ErrorInterceptor.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjectable"
        ]({ token: ErrorInterceptor, factory: ErrorInterceptor.ɵfac });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              ErrorInterceptor,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ tZre:
      /*!*********************************************!*\
  !*** ./src/app/services/message.service.ts ***!
  \*********************************************/
      /*! exports provided: MessageService */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MessageService",
          function () {
            return MessageService;
          }
        );
        /* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! tslib */ "mrSG"
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _microsoft_signalr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @microsoft/signalr */ "6HpG"
        );
        /* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! rxjs */ "qCKp"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! src/environments/environment */ "AytR"
        );
        /* harmony import */ var _paginationHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./paginationHelper */ "4IKs"
        );
        /* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @angular/common/http */ "tk/3"
        );

        // Helpers

        class MessageService {
          constructor(http) {
            this.http = http;
            this.baseUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_5__[
                "environment"
              ].apiUrl;
            this.hubUrl =
              src_environments_environment__WEBPACK_IMPORTED_MODULE_5__[
                "environment"
              ].hubUrl;
            this.messageThreadSource = new rxjs__WEBPACK_IMPORTED_MODULE_3__[
              "BehaviorSubject"
            ]([]);
            this.messageThread$ = this.messageThreadSource.asObservable();
          }
          createHubConnection(user, otherUsername) {
            this.hubConnection = new _microsoft_signalr__WEBPACK_IMPORTED_MODULE_2__[
              "HubConnectionBuilder"
            ]()
              .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {
                accessTokenFactory: () => user.token,
              })
              .withAutomaticReconnect()
              .build();
            this.hubConnection.start().catch((error) => console.log(error));
            this.hubConnection.on("ReceiveMessageThread", (messages) => {
              this.messageThreadSource.next(messages);
            });
            this.hubConnection.on("NewMessage", (message) => {
              this.messageThread$
                .pipe(
                  Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1)
                )
                .subscribe((messages) => {
                  this.messageThreadSource.next([...messages, message]);
                });
            });
            this.hubConnection.on("UpdatedGroup", (group) => {
              if (group.connections.some((c) => c.username === otherUsername)) {
                this.messageThread$
                  .pipe(
                    Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(
                      1
                    )
                  )
                  .subscribe((messages) => {
                    messages.forEach((message) => {
                      if (!message.dateRead) {
                        message.dateRead = new Date(Date.now());
                      }
                    });
                    this.messageThreadSource.next([...messages]);
                  });
              }
            });
          }
          stopHubConnection() {
            if (this.hubConnection) {
              this.hubConnection.stop();
            }
          }
          getMessages(pageNumber, pageSize, container) {
            let params = Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_6__[
                "getPaginationHeaders"
              ]
            )(pageNumber, pageSize);
            params = params.append("Container", container);
            return Object(
              _paginationHelper__WEBPACK_IMPORTED_MODULE_6__[
                "getPaginatedResult"
              ]
            )(`${this.baseUrl}messages`, params, this.http);
          }
          getMessageThread(username) {
            return this.http.get(`${this.baseUrl}messages/thread/${username}`);
          }
          sendMessage(username, content) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(
              this,
              void 0,
              void 0,
              function* () {
                return this.hubConnection
                  .invoke("SendMessage", {
                    recipientUsername: username,
                    content,
                  })
                  .catch((error) => console.log(error));
              }
            );
          }
          deleteMessage(id) {
            return this.http.delete(`${this.baseUrl}messages/${id}`);
          }
        }
        MessageService.ɵfac = function MessageService_Factory(t) {
          return new (t || MessageService)(
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](
              _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClient"]
            )
          );
        };
        MessageService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__[
          "ɵɵdefineInjectable"
        ]({
          token: MessageService,
          factory: MessageService.ɵfac,
          providedIn: "root",
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](
              MessageService,
              [
                {
                  type:
                    _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
                  args: [
                    {
                      providedIn: "root",
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      _angular_common_http__WEBPACK_IMPORTED_MODULE_7__[
                        "HttpClient"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ u2he:
      /*!**************************************************************!*\
  !*** ./src/app/members/member-edit/member-edit.component.ts ***!
  \**************************************************************/
      /*! exports provided: MemberEditComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "MemberEditComponent",
          function () {
            return MemberEditComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! rxjs/operators */ "kU1M"
        );
        /* harmony import */ var src_app_services_account_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! src/app/services/account.service */ "flj8"
        );
        /* harmony import */ var src_app_services_members_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! src/app/services/members.service */ "15gN"
        );
        /* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ngx-toastr */ "5eHb"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        /* harmony import */ var ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ngx-bootstrap/tabs */ "44PX"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ../photo-editor/photo-editor.component */ "Zkt1"
        );
        /* harmony import */ var ngx_timeago__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ngx-timeago */ "twue"
        );
        // libs

        const _c0 = ["editForm"];
        function MemberEditComponent_div_0_div_5_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              24
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              2,
              "Information: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              3,
              " You have made changes. Any unsaved changes will be lost. "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        }
        function MemberEditComponent_div_0_Template(rf, ctx) {
          if (rf & 1) {
            const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵgetCurrentView"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              1
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "div",
              2
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "h1"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              3,
              "Your profile"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              4,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
              5,
              MemberEditComponent_div_0_div_5_Template,
              4,
              0,
              "div",
              4
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              6,
              "div",
              2
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              7,
              "div",
              5
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              8,
              "img",
              6
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              9,
              "div",
              7
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              10,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              11,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              12,
              "Location: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              13,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              15,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              16,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Age: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              18,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              20,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              21,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              22,
              "Last active: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              23,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](25, "timeago");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              26,
              "div"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              27,
              "strong"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              28,
              "Member since: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              29,
              "p"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](31, "date");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              32,
              "div",
              8
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              33,
              "button",
              9
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              34,
              " Save Changes "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              35,
              "div",
              3
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              36,
              "tabset",
              10
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              37,
              "tab",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              38,
              "form",
              12,
              13
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngSubmit",
              function MemberEditComponent_div_0_Template_form_ngSubmit_38_listener() {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return ctx_r3.updateMember();
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              40,
              "h4"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              41,
              "Description"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              42,
              "textarea",
              14
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberEditComponent_div_0_Template_textarea_ngModelChange_42_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r5.member.introduction = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              43,
              "h4",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              44,
              "Looking for"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              45,
              "textarea",
              16
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberEditComponent_div_0_Template_textarea_ngModelChange_45_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r6.member.lookingFor = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              46,
              "h4",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              47,
              "Interests"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              48,
              "textarea",
              17
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberEditComponent_div_0_Template_textarea_ngModelChange_48_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r7.member.interests = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              49,
              "h4",
              15
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              50,
              "Location Details:"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              51,
              "div",
              18
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              52,
              "label",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "City: ");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              54,
              "input",
              20
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberEditComponent_div_0_Template_input_ngModelChange_54_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r8.member.city = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              55,
              "label",
              19
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
              56,
              "Country: "
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              57,
              "input",
              21
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "ngModelChange",
              function MemberEditComponent_div_0_Template_input_ngModelChange_57_listener(
                $event
              ) {
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](
                  _r4
                );
                const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵnextContext"
                ]();
                return (ctx_r9.member.country = $event);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              58,
              "tab",
              22
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](
              59,
              "app-photo-editor",
              23
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵreference"
            ](39);
            const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngIf",
              _r2.dirty
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "src",
              ctx_r0.member.photoUrl || "./assets/user.png",
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"](
              "alt",
              ctx_r0.member.knownAs
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"](
              "",
              ctx_r0.member.city,
              ", ",
              ctx_r0.member.country,
              ""
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              ctx_r0.member.age
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                25,
                16,
                ctx_r0.member.lastActive
              )
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](
                31,
                18,
                ctx_r0.member.created
              )
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "disabled",
              !_r2.dirty
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵpropertyInterpolate1"
            ]("heading", "About ", ctx_r0.member.knownAs, "");
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r0.member.introduction
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r0.member.lookingFor
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r0.member.interests
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r0.member.city
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "ngModel",
              ctx_r0.member.country
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "member",
              ctx_r0.member
            );
          }
        }
        class MemberEditComponent {
          constructor(accountService, memberService, toastr) {
            this.accountService = accountService;
            this.memberService = memberService;
            this.toastr = toastr;
            this.accountService.currentUser$
              .pipe(
                Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["take"])(1)
              )
              .subscribe((user) => (this.user = user));
          }
          unloadNotification($event) {
            if (this.editForm.dirty) {
              $event.returnValue = true;
            }
          }
          ngOnInit() {
            this.loadMember();
          }
          loadMember() {
            this.memberService
              .getMember(this.user.userName)
              .subscribe((member) => (this.member = member));
          }
          updateMember() {
            this.memberService.updateMember(this.member).subscribe(() => {
              this.toastr.success("Profile updated successfully!");
              this.editForm.reset(this.member);
            });
          }
        }
        MemberEditComponent.ɵfac = function MemberEditComponent_Factory(t) {
          return new (t || MemberEditComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                "AccountService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              src_app_services_members_service__WEBPACK_IMPORTED_MODULE_3__[
                "MembersService"
              ]
            ),
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"]
            )
          );
        };
        MemberEditComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: MemberEditComponent,
          selectors: [["app-member-edit"]],
          viewQuery: function MemberEditComponent_Query(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
            }
            if (rf & 2) {
              let _t;
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](
                (_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                  "ɵɵloadQuery"
                ]())
              ) && (ctx.editForm = _t.first);
            }
          },
          hostBindings: function MemberEditComponent_HostBindings(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "beforeunload",
                function MemberEditComponent_beforeunload_HostBindingHandler(
                  $event
                ) {
                  return ctx.unloadNotification($event);
                },
                false,
                _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresolveWindow"]
              );
            }
          },
          decls: 1,
          vars: 1,
          consts: [
            ["class", "row", 4, "ngIf"],
            [1, "row"],
            [1, "col-4"],
            [1, "col-8"],
            ["class", "alert alert-info", 4, "ngIf"],
            [1, "card"],
            [1, "card-image-top", "img-thumbnail", 3, "src", "alt"],
            [1, "card-body"],
            [1, "card-footer"],
            [
              "form",
              "editForm",
              1,
              "btn",
              "btn-success",
              "btn-block",
              3,
              "disabled",
            ],
            [1, "member-tabset"],
            [3, "heading"],
            ["id", "editForm", 3, "ngSubmit"],
            ["editForm", "ngForm"],
            [
              "name",
              "introduction",
              "rows",
              "6",
              1,
              "form-control",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [1, "mt-2"],
            [
              "name",
              "lookingFor",
              "rows",
              "6",
              1,
              "form-control",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [
              "name",
              "interests",
              "rows",
              "6",
              1,
              "form-control",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [1, "form-inline"],
            ["for", "city"],
            [
              "type",
              "text",
              "name",
              "city",
              1,
              "form-control",
              "mx-2",
              3,
              "ngModel",
              "ngModelChange",
            ],
            [
              "type",
              "text",
              "name",
              "country",
              1,
              "form-control",
              "mx-2",
              3,
              "ngModel",
              "ngModelChange",
            ],
            ["heading", "Edit Photos"],
            [3, "member"],
            [1, "alert", "alert-info"],
          ],
          template: function MemberEditComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                0,
                MemberEditComponent_div_0_Template,
                60,
                20,
                "div",
                0
              );
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngIf",
                ctx.member
              );
            }
          },
          directives: [
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_6__["TabsetComponent"],
            ngx_bootstrap_tabs__WEBPACK_IMPORTED_MODULE_6__["TabDirective"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgForm"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["DefaultValueAccessor"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgControlStatus"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["NgModel"],
            _photo_editor_photo_editor_component__WEBPACK_IMPORTED_MODULE_8__[
              "PhotoEditorComponent"
            ],
          ],
          pipes: [
            ngx_timeago__WEBPACK_IMPORTED_MODULE_9__["TimeagoPipe"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"],
          ],
          styles: [
            ".img-thumbnail[_ngcontent-%COMP%] {\r\n  margin: 25px;\r\n  width: 85%;\r\n  height: 85%;\r\n}\r\n\r\n.card-body[_ngcontent-%COMP%] {\r\n  padding: 0 25px;\r\n}\r\n\r\n.card-footer[_ngcontent-%COMP%] {\r\n  padding: 10px 15px;\r\n  background-color: #ffffff;\r\n  border-top: none;\r\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWVtYmVycy9tZW1iZXItZWRpdC9tZW1iZXItZWRpdC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBWTtFQUNaLFVBQVU7RUFDVixXQUFXO0FBQ2I7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixnQkFBZ0I7QUFDbEIiLCJmaWxlIjoic3JjL2FwcC9tZW1iZXJzL21lbWJlci1lZGl0L21lbWJlci1lZGl0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW1nLXRodW1ibmFpbCB7XHJcbiAgbWFyZ2luOiAyNXB4O1xyXG4gIHdpZHRoOiA4NSU7XHJcbiAgaGVpZ2h0OiA4NSU7XHJcbn1cclxuXHJcbi5jYXJkLWJvZHkge1xyXG4gIHBhZGRpbmc6IDAgMjVweDtcclxufVxyXG5cclxuLmNhcmQtZm9vdGVyIHtcclxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcclxuICBib3JkZXItdG9wOiBub25lO1xyXG59XHJcbiJdfQ== */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              MemberEditComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-member-edit",
                      templateUrl: "./member-edit.component.html",
                      styleUrls: ["./member-edit.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      src_app_services_account_service__WEBPACK_IMPORTED_MODULE_2__[
                        "AccountService"
                      ],
                  },
                  {
                    type:
                      src_app_services_members_service__WEBPACK_IMPORTED_MODULE_3__[
                        "MembersService"
                      ],
                  },
                  {
                    type:
                      ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
                  },
                ];
              },
              {
                editForm: [
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
                    args: ["editForm"],
                  },
                ],
                unloadNotification: [
                  {
                    type:
                      _angular_core__WEBPACK_IMPORTED_MODULE_0__[
                        "HostListener"
                      ],
                    args: ["window:beforeunload", ["$event"]],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ vMgs:
      /*!*******************************************************************!*\
  !*** ./src/app/modals/confirm-dialog/confirm-dialog.component.ts ***!
  \*******************************************************************/
      /*! exports provided: ConfirmDialogComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "ConfirmDialogComponent",
          function () {
            return ConfirmDialogComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ngx-bootstrap/modal */ "LqlI"
        );
        // Libs

        class ConfirmDialogComponent {
          constructor(bsModalRef) {
            this.bsModalRef = bsModalRef;
          }
          ngOnInit() {}
          confirm() {
            this.result = true;
            this.bsModalRef.hide();
          }
          decline() {
            this.result = false;
            this.bsModalRef.hide();
          }
        }
        ConfirmDialogComponent.ɵfac = function ConfirmDialogComponent_Factory(
          t
        ) {
          return new (t || ConfirmDialogComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]
            )
          );
        };
        ConfirmDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: ConfirmDialogComponent,
          selectors: [["app-confirm-dialog"]],
          decls: 11,
          vars: 4,
          consts: [
            [1, "modal-header"],
            [1, "modal-title", "pull-left"],
            [1, "modal-body"],
            [1, "modal-footer"],
            ["type", "button", 1, "btn", "btn-success", 3, "click"],
            ["type", "button", 1, "btn", "btn-danger", 3, "click"],
          ],
          template: function ConfirmDialogComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h4",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "div",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "p"
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "div",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "button",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function ConfirmDialogComponent_Template_button_click_7_listener() {
                  return ctx.confirm();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                9,
                "button",
                5
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function ConfirmDialogComponent_Template_button_click_9_listener() {
                  return ctx.decline();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.title
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
                ctx.message
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
                " ",
                ctx.btnOkText,
                " "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
                " ",
                ctx.btnCancelText,
                " "
              );
            }
          },
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZGFscy9jb25maXJtLWRpYWxvZy9jb25maXJtLWRpYWxvZy5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              ConfirmDialogComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-confirm-dialog",
                      templateUrl: "./confirm-dialog.component.html",
                      styleUrls: ["./confirm-dialog.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__[
                        "BsModalRef"
                      ],
                  },
                ];
              },
              null
            );
        })();

        /***/
      },

    /***/ vY5A:
      /*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
      /*! exports provided: AppRoutingModule */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "AppRoutingModule",
          function () {
            return AppRoutingModule;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! @angular/router */ "tyNb"
        );
        /* harmony import */ var _guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./guards/prevent-unsaved-changes.guard */ "Rx+e"
        );
        /* harmony import */ var _guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! ./guards/auth.guard */ "UTcu"
        );
        /* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
          /*! ./home/home.component */ "9vUh"
        );
        /* harmony import */ var _lists_lists_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
          /*! ./lists/lists.component */ "hnRM"
        );
        /* harmony import */ var _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
          /*! ./members/member-detail/member-detail.component */ "PL33"
        );
        /* harmony import */ var _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
          /*! ./members/member-list/member-list.component */ "Rv1c"
        );
        /* harmony import */ var _messages_messages_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
          /*! ./messages/messages.component */ "DruN"
        );
        /* harmony import */ var _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
          /*! ./errors/not-found/not-found.component */ "4rg4"
        );
        /* harmony import */ var _errors_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
          /*! ./errors/server-error/server-error.component */ "81j5"
        );
        /* harmony import */ var _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
          /*! ./members/member-edit/member-edit.component */ "u2he"
        );
        /* harmony import */ var _resolvers_member_detail_resolver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
          /*! ./resolvers/member-detail.resolver */ "mqOd"
        );
        /* harmony import */ var _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
          /*! ./admin/admin-panel/admin-panel.component */ "qPLm"
        );
        /* harmony import */ var _guards_admin_guard__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
          /*! ./guards/admin.guard */ "Tk1w"
        );
        // Libs

        // Guards

        // Components

        // Resolvers

        const routes = [
          {
            path: "",
            component:
              _home_home_component__WEBPACK_IMPORTED_MODULE_4__[
                "HomeComponent"
              ],
          },
          {
            path: "",
            runGuardsAndResolvers: "always",
            canActivate: [
              _guards_auth_guard__WEBPACK_IMPORTED_MODULE_3__["AuthGuard"],
            ],
            children: [
              {
                path: "members",
                component:
                  _members_member_list_member_list_component__WEBPACK_IMPORTED_MODULE_7__[
                    "MemberListComponent"
                  ],
              },
              {
                path: "members/:username",
                component:
                  _members_member_detail_member_detail_component__WEBPACK_IMPORTED_MODULE_6__[
                    "MemberDetailComponent"
                  ],
                resolve: {
                  member:
                    _resolvers_member_detail_resolver__WEBPACK_IMPORTED_MODULE_12__[
                      "MemberDetailResolver"
                    ],
                },
              },
              {
                path: "member/edit",
                component:
                  _members_member_edit_member_edit_component__WEBPACK_IMPORTED_MODULE_11__[
                    "MemberEditComponent"
                  ],
                canDeactivate: [
                  _guards_prevent_unsaved_changes_guard__WEBPACK_IMPORTED_MODULE_2__[
                    "PreventUnsavedChangesGuard"
                  ],
                ],
              },
              {
                path: "lists",
                component:
                  _lists_lists_component__WEBPACK_IMPORTED_MODULE_5__[
                    "ListsComponent"
                  ],
              },
              {
                path: "messages",
                component:
                  _messages_messages_component__WEBPACK_IMPORTED_MODULE_8__[
                    "MessagesComponent"
                  ],
              },
              {
                path: "admin",
                component:
                  _admin_admin_panel_admin_panel_component__WEBPACK_IMPORTED_MODULE_13__[
                    "AdminPanelComponent"
                  ],
                canActivate: [
                  _guards_admin_guard__WEBPACK_IMPORTED_MODULE_14__[
                    "AdminGuard"
                  ],
                ],
              },
            ],
          },
          {
            path: "not-found",
            component:
              _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_9__[
                "NotFoundComponent"
              ],
          },
          {
            path: "server-error",
            component:
              _errors_server_error_server_error_component__WEBPACK_IMPORTED_MODULE_10__[
                "ServerErrorComponent"
              ],
          },
          {
            path: "**",
            component:
              _errors_not_found_not_found_component__WEBPACK_IMPORTED_MODULE_9__[
                "NotFoundComponent"
              ],
            pathMatch: "full",
          },
        ];
        class AppRoutingModule {}
        AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineNgModule"
        ]({ type: AppRoutingModule });
        AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineInjector"
        ]({
          factory: function AppRoutingModule_Factory(t) {
            return new (t || AppRoutingModule)();
          },
          imports: [
            [
              _angular_router__WEBPACK_IMPORTED_MODULE_1__[
                "RouterModule"
              ].forRoot(routes, { relativeLinkResolution: "legacy" }),
            ],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
          ],
        });
        (function () {
          (typeof ngJitMode === "undefined" || ngJitMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵsetNgModuleScope"
            ](AppRoutingModule, {
              imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
              ],
              exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"],
              ],
            });
        })();
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              AppRoutingModule,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
                  args: [
                    {
                      imports: [
                        _angular_router__WEBPACK_IMPORTED_MODULE_1__[
                          "RouterModule"
                        ].forRoot(routes, { relativeLinkResolution: "legacy" }),
                      ],
                      exports: [
                        _angular_router__WEBPACK_IMPORTED_MODULE_1__[
                          "RouterModule"
                        ],
                      ],
                    },
                  ],
                },
              ],
              null,
              null
            );
        })();

        /***/
      },

    /***/ yNbP:
      /*!*************************************************************!*\
  !*** ./src/app/modals/roles-modal/roles-modal.component.ts ***!
  \*************************************************************/
      /*! exports provided: RolesModalComponent */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export (binding) */ __webpack_require__.d(
          __webpack_exports__,
          "RolesModalComponent",
          function () {
            return RolesModalComponent;
          }
        );
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ngx-bootstrap/modal */ "LqlI"
        );
        /* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! @angular/forms */ "3Pt+"
        );
        /* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/common */ "ofXK"
        );
        // Libs

        function RolesModalComponent_div_9_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              0,
              "div",
              11
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              1,
              "input",
              12
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
              "change",
              function RolesModalComponent_div_9_Template_input_change_1_listener() {
                const role_r2 = ctx.$implicit;
                return (role_r2.checked = !role_r2.checked);
              }
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
              2,
              "label"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
          if (rf & 2) {
            const role_r2 = ctx.$implicit;
            const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "ɵɵnextContext"
            ]();
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
              "checked",
              role_r2.checked
            )(
              "disabled",
              role_r2.name === "Admin" && ctx_r1.user.userName === "admin"
            );
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](
              role_r2.name
            );
          }
        }
        class RolesModalComponent {
          constructor(bsModalRef) {
            this.bsModalRef = bsModalRef;
            this.updateSelectedRoles = new _angular_core__WEBPACK_IMPORTED_MODULE_0__[
              "EventEmitter"
            ]();
            this.roles = [];
          }
          ngOnInit() {}
          updateRoles() {
            this.updateSelectedRoles.emit(this.roles);
            this.bsModalRef.hide();
          }
        }
        RolesModalComponent.ɵfac = function RolesModalComponent_Factory(t) {
          return new (t || RolesModalComponent)(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](
              ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["BsModalRef"]
            )
          );
        };
        RolesModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__[
          "ɵɵdefineComponent"
        ]({
          type: RolesModalComponent,
          selectors: [["app-roles-modal"]],
          inputs: { updateSelectedRoles: "updateSelectedRoles" },
          decls: 15,
          vars: 2,
          consts: [
            [1, "modal-header"],
            [1, "modal-title", "pull-left"],
            [
              "type",
              "button",
              "aria-label",
              "Close",
              1,
              "close",
              "pull-right",
              3,
              "click",
            ],
            ["aria-hidden", "true"],
            [1, "modal-body"],
            ["id", "rolesForm"],
            ["rolesForm", "ngForm"],
            ["class", "form-check", 4, "ngFor", "ngForOf"],
            [1, "modal-footer"],
            ["type", "button", 1, "btn", "btn-default", 3, "click"],
            ["type", "button", 1, "btn", "btn-success", 3, "click"],
            [1, "form-check"],
            [
              "type",
              "checkbox",
              "value",
              "role.name",
              1,
              "form-check-input",
              3,
              "checked",
              "disabled",
              "change",
            ],
          ],
          template: function RolesModalComponent_Template(rf, ctx) {
            if (rf & 1) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                0,
                "div",
                0
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                1,
                "h4",
                1
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                3,
                "button",
                2
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function RolesModalComponent_Template_button_click_3_listener() {
                  return ctx.bsModalRef.hide();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                4,
                "span",
                3
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "\u00D7");
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                6,
                "div",
                4
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                7,
                "form",
                5,
                6
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](
                9,
                RolesModalComponent_div_9_Template,
                4,
                3,
                "div",
                7
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                10,
                "div",
                8
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                11,
                "button",
                9
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function RolesModalComponent_Template_button_click_11_listener() {
                  return ctx.bsModalRef.hide();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                12,
                " Cancel "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](
                13,
                "button",
                10
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"](
                "click",
                function RolesModalComponent_Template_button_click_13_listener() {
                  return ctx.updateRoles();
                }
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](
                14,
                " Submit "
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
            }
            if (rf & 2) {
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](
                "Edit roles for ",
                ctx.user.userName,
                ""
              );
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
              _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"](
                "ngForOf",
                ctx.roles
              );
            }
          },
          directives: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__[
              "ɵangular_packages_forms_forms_y"
            ],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"],
          ],
          styles: [
            "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21vZGFscy9yb2xlcy1tb2RhbC9yb2xlcy1tb2RhbC5jb21wb25lbnQuY3NzIn0= */",
          ],
        });
        (function () {
          (typeof ngDevMode === "undefined" || ngDevMode) &&
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](
              RolesModalComponent,
              [
                {
                  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
                  args: [
                    {
                      selector: "app-roles-modal",
                      templateUrl: "./roles-modal.component.html",
                      styleUrls: ["./roles-modal.component.css"],
                    },
                  ],
                },
              ],
              function () {
                return [
                  {
                    type:
                      ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__[
                        "BsModalRef"
                      ],
                  },
                ];
              },
              {
                updateSelectedRoles: [
                  {
                    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"],
                  },
                ],
              }
            );
        })();

        /***/
      },

    /***/ zUnb:
      /*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
      /*! no exports provided */
      /***/ function (module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
          /*! @angular/core */ "fXoL"
        );
        /* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
          /*! ./environments/environment */ "AytR"
        );
        /* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
          /*! ./app/app.module */ "ZAI4"
        );
        /* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
          /*! @angular/platform-browser */ "jhN1"
        );

        if (
          _environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"]
            .production
        ) {
          Object(
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"]
          )();
        }
        _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__[
          "platformBrowser"
        ]()
          .bootstrapModule(
            _app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"]
          )
          .catch((err) => console.error(err));

        /***/
      },

    /***/ zn8P:
      /*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
      /*! no static exports found */
      /***/ function (module, exports) {
        function webpackEmptyAsyncContext(req) {
          // Here Promise.resolve().then() is used instead of new Promise() to prevent
          // uncaught exception popping up in devtools
          return Promise.resolve().then(function () {
            var e = new Error("Cannot find module '" + req + "'");
            e.code = "MODULE_NOT_FOUND";
            throw e;
          });
        }
        webpackEmptyAsyncContext.keys = function () {
          return [];
        };
        webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
        module.exports = webpackEmptyAsyncContext;
        webpackEmptyAsyncContext.id = "zn8P";

        /***/
      },
  },
  [[0, "runtime", "vendor"]],
]);
//# sourceMappingURL=main.js.map
