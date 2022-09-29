import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import avatarRouter from './routes/avatar.js';
import pushToIPFSRouter from './routes/pushToIPFS.js';

const App = express();

// view engine setup
App.set('views', './views');
App.set('view engine', 'jade');

App.use(logger('dev'));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
App.use(cookieParser());
App.use(express.static('public'));
App.use(express.static('../client/build'));

//app.use('/', indexRouter);
App.use('/avatar', avatarRouter);
App.use('/pushtoIPFS', pushToIPFSRouter);

App.get('*', (req, res) => {
  res.sendFile(new URL('../client/build/index.html', import.meta.url).pathname ); 
});

// catch 404 and forward to error handler
App.use(function(req, res, next) {
  next(createError(404));
});

// error handler
App.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default App;
