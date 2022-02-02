export interface BaseModel {
  id?: string | number;
}

export interface AggregateRoot extends BaseModel {
  name: string;
}
