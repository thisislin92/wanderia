FROM node:latest
WORKDIR /users
COPY . .
RUN npm install --production
ENV PORT=4003
ENV NODE_ENV=production
EXPOSE 4003
CMD ["node", "app"]