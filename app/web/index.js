import App from './utils/createApp';
import models from './models';
import routes from './containers/Root';

const app = new App();
app.useModels(models);
app.useRoutes(routes);
app.start('app');
