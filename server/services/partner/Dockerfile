FROM node:latest
WORKDIR /users
COPY . .
RUN npm install --production
ENV PORT=4002
ENV NODE_ENV=production
EXPOSE 4002
CMD ["node", "app"]