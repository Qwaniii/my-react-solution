import mc from 'merge-change';
import { type LogInterface, State } from 'react-solution';
import type { GetQuery, Patch } from 'react-solution';
import { UsersApi } from '../users/api';
import { ProfileStoreConfig, ProfileStoreData } from './types';

/**
 * Детальная информация о пользователе
 */
export class ProfileStore {
  readonly state;
  protected config: ProfileStoreConfig = {};

  constructor(
    protected depends: {
      usersApi: UsersApi;
      config?: Patch<ProfileStoreConfig>;
      logger: LogInterface;
    },
  ) {
    this.config = mc.merge(this.config, depends.config);
    this.depends.logger = this.depends.logger.named(this.constructor.name);
    this.state = new State<ProfileStoreData>(this.defaultState(), this.depends.logger);
  }

  defaultState(): ProfileStoreData {
    return {
      data: null,
      waiting: false, // признак ожидания загрузки
    };
  }

  /**
   * Загрузка профиля
   */
   async load(id: string ) {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.state.set({
      data: null,
      waiting: true,
    });

    // Выбор своего профиля из АПИ
    const { data } = await this.depends.usersApi.findOne({id: id});

    // Профиль загружен успешно
    this.state.set(
      {
        data: data.result,
        waiting: false,
      },
      'Загружен профиль из АПИ',
    );
  }

  reset( ) {
    // Сброс текущего профиля и установка признака ожидания загрузки
    this.state.set({
      data: null,
      waiting: true,
    },
  'сброс пользователя');
  }
}