FROM node:latest
WORKDIR /users
COPY . .
RUN npm install --production
ENV PORT=4000
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "app"]