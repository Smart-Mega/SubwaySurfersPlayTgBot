import {
  BulkCreateOptions,
  CountOptions,
  CreateOptions,
  DestroyOptions,
  FindOptions,
  FindOrCreateOptions,
  UpdateOptions
} from "sequelize"

import { LoggerUtil } from "@/utils"

export default class BaseDao {
  private Model: any

  constructor(model: any) {
    this.Model = model
  }

  public async create(values: any, options?: CreateOptions<any>): Promise<any> {
    return this.Model.create(values, options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async bulkCreate(records: any, options?: BulkCreateOptions<any>): Promise<any> {
    return this.Model.bulkCreate(records, options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async count(options: CountOptions): Promise<any> {
    return this.Model.count(options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async findAll(options: FindOptions): Promise<any> {
    return this.Model.findAll(options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async findOne(options: FindOptions): Promise<any> {
    return this.Model.findOne(options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async findOrCreate({ where, defaults }: FindOrCreateOptions): Promise<any> {
    try {
      const result = await this.Model.findOrCreate({
        where,
        defaults
      })
      return result
    } catch (e) {
      LoggerUtil.error(e)
      console.error(e)
      throw e
    }
  }

  public async update(values: any, options: UpdateOptions): Promise<any> {
    return this.Model.update(values, options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }

  public async destroy(options: DestroyOptions<any>): Promise<any> {
    return this.Model.destroy(options)
      .then((result: any) => result)
      .catch((e: any) => {
        LoggerUtil.error(e)
        console.error(e)
      })
  }
}
