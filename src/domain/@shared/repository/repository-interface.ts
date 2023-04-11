export default interface RepositoryInterface<T> {
  create(data: T): Promise<void>;
  update(data: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
