import request from './index'

export const getName = function(){
  return request.get('/example/list')
}