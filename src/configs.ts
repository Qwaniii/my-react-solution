import { config, I18N_CFG, LOG_CFG, HTTP_CLIENT_CFG } from 'react-solution';

export const configs = [
  config(HTTP_CLIENT_CFG, ({ env }) => ({
    // Обычно хост на апи относительный и используется прокси для устранения CORS
    // Но в режиме рендера на сервере необходимо указать полный адрес к АПИ
    baseURL: env.SSR ? env.API_URL : '',
    headers: {
      'Content-Type': 'application/json',
      'X-Token': '5b17129b9c6ea2ad562480d9cea55c1e6d51ca97893047cfe2f92efec4895f73',
      "Strict-Transport-Security": "max-age=31536000"
    },
    //auth:{} base auth
  })),

  config(I18N_CFG, {
    locale: 'ru-RU', // локаль по умолчанию если не будет определена автоматически
    auto: true,
    remember: true,
  }),

  config(LOG_CFG, {
    // По умолчанию для всех
    enabled: true,
    // Включение именованных логгеров
    'example-name': true,
    // Принудительное отключение для всех (так как в именованных disable не переопределен)
    disable: false,
  }),
];
