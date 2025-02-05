# 簡單的 WSGI 測試應用程式，回應 "Hello, Nginx is working!"
def application(environ, start_response):
    status = '200 OK'
    headers = [('Content-Type', 'text/plain')]
    start_response(status, headers)
    return [b"Hello, Nginx is working!"]
