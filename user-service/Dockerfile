FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN  npm install

ARG NODE_ENV

RUN npm install 
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then npm install; \
#     else npm install --only=production; \
#     fi

COPY ./ ./

RUN npm run build

ENV PORT 3000
EXPOSE 3000

CMD ["node","./build/app.js"]