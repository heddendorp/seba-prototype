import {Document, FilterQuery, Model} from "mongoose";
import {Category, CategoryConfiguration, CategoryLogger, CategoryServiceFactory, LogLevel} from "typescript-logging";

export abstract class BaseService<T extends Document> {

  private logger: CategoryLogger;
  private model: Model<T>;
  private readonly descriptor: string;
  private identifiers: string[];

  protected constructor(model: Model<T>, descriptor: string, ...identifiers: string[]) {
    CategoryServiceFactory.setDefaultConfiguration(new CategoryConfiguration(LogLevel.Info));

    this.logger = new Category("database");
    this.model = model;
    this.descriptor = descriptor;
    this.identifiers = identifiers;
  }

  protected async baseCreate(entry: T, filter: FilterQuery<T>) {
    this.model.exists(filter).then((result) => {
      if (!result) {
        entry.save();
        this.logger.info(`Created ${this.descriptor} ${this.getIdentifierString(entry)}.`)
      }
      else
        this.logger.warn(`The ${this.descriptor} ${this.getIdentifierString(entry)} already exists. Did you mean update()?`);
    });
  }

  protected baseDelete(filter: FilterQuery<T>) {
    this.model.deleteOne(filter, () => this.logger.info(`The ${this.descriptor} with ${filter} was deleted.`));
  }

  protected baseGet(filter: FilterQuery<T>) {
    return this.model.findOne(filter);
  }

  protected baseUpdate(entry: T, filter: FilterQuery<T>, ...properties: string[]) {
    this.baseGet(filter).then(dbEntry => {
      if (dbEntry != null) {
        properties.forEach(property => {
          dbEntry.set(property, entry.get(property));
        });
        dbEntry.save();
        this.logger.info(`The ${this.descriptor} ${this.getIdentifierString(entry)} was updated.`);
      }
      else
        this.logger.warn(`The ${this.descriptor} ${this.getIdentifierString(entry)} already exists. Did you mean create()?`);
    });
  }

  private getIdentifierString(entry: T) {
    return this.identifiers.map(id => entry.get(id)).join(" - ");
  }
}
