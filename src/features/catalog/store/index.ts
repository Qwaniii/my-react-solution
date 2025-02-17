import { z } from 'zod';
import mc from 'merge-change';
import type { FindQuery, LogInterface, Patch } from 'react-solution';
import { exclude } from 'react-solution';
import { DataParamsState, type DefaultConfig } from 'react-solution';
import type { RouterService } from 'react-solution';
import type { ArticlesApi } from '@src/features/catalog/api';
import { TArticleData, TArticleParams } from './types.js';

/**
 * Детальная информация о пользователе
 */
export class ArticlesStore extends DataParamsState<TArticleData, TArticleParams> {
  override defaultConfig() {
    return {
      ...super.defaultConfig(),
      queryParamsGroup: 'articles',
    };
  }

  constructor(
    protected override depends: {
      env: Env;
      config?: Patch<DefaultConfig>;
      router: RouterService;
      articlesApi: ArticlesApi;
      logger: LogInterface;
    },
  ) {
    super(depends);
  }

  override defaultState() {
    return mc.patch(super.defaultState(), {
      data: {
        items: [],
        count: 0,
      },
      params: {
        category: '',
        query: '',
      },
    });
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
  protected override apiParams(params: TArticleParams): FindQuery {
    const apiParams = mc.patch(super.apiParams(params), {
      fields: `items(*,category(title),madeIn(title)), count`,
      filter: {
        category: params.category,
        query: params.query,
      },
    });

    return exclude(apiParams, {
      skip: 0,
      filter: {
        category: '',
      },
    });
  }

  /**
   * Загрузка данных
   * @param apiParams Параметры АПИ запроса
   */
  protected override async loadData(apiParams: FindQuery): Promise<TArticleData> {
    const response = await this.depends.articlesApi.findMany(apiParams);
    // Установка полученных данных в состояние
    return response.data.result;
  }
}