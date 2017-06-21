import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

app.model(require("./models/bookShelf"));

app.model(require("./models/bookReader"));

app.model(require("./models/bookSearch"));

app.model(require("./models/user"));

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
