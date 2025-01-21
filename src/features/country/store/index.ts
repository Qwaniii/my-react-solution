import { z } from 'zod';
import mc from 'merge-change';
import type { FindQuery, LogInterface, Patch } from 'react-solution';
import { exclude } from 'react-solution';
import { DataParamsState, type DefaultConfig } from 'react-solution';
import type { RouterService } from 'react-solution';
import type { CountriesApi } from '@src/features/country/api';
import { TCountryData, TCountryParams } from './types.js';

/**
 * Детальная информация о пользователе
 */
export class CountriesStore extends DataParamsState<TCountryData, TCountryParams> {
  override defaultConfig() {
    return {
      ...super.defaultConfig(),
      queryParamsGroup: 'countries',
    };
  }

  constructor(
    protected override depends: {
      env: Env;
      config?: Patch<DefaultConfig>;
      router: RouterService;
      countriesApi: CountriesApi;
      logger: LogInterface;
    },
  ) {
    super(depends);
  }

  override defaultState() {
    return mc.merge(super.defaultState(), {
      data: {
        items: [],
        count: 0,
      },
      params: {
        limit: 10,
        query: '',
        sort: ''
    }});
  
  }

  /**
   * Схема валидации восстановленных параметров
   */
  override paramsSchema() {
    return super.paramsSchema().extend({
      query: z.string().optional(),
    });
  }

  /**
   * Параметры для АПИ запроса
   * @param params Параметры состояния
   */
  protected override apiParams(params: TCountryParams): FindQuery {
    const apiParams = mc.merge(super.apiParams(params), {
      fields: `items(*, _id,title,code),count`,
      filter: {
        query: params.query,
        sort: params.sort == 'all' ? '' : params.sort
      },
    });

    return exclude(apiParams, {
      skip: 0,
      filter: {
        query: '',
        sort: ''
      }
    });
  }

  /**
   * Загрузка данных
   * @param apiParams Параметры АПИ запроса
   */
  protected override async loadData(apiParams: FindQuery): Promise<TCountryData> {
    const response = await this.depends.countriesApi.findMany(apiParams);
    // Установка полученных данных в состояние
    return response.data.result
  }
}