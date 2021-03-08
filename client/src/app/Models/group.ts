import { Connection } from './connection';

export interface Group {
  name: string;
  connections: Connection[];
}
