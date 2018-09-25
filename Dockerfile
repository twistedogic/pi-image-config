FROM node:8-slim

WORKDIR /tmp/project
COPY . .
RUN npm install
RUN npm run test
RUN npm run build

FROM node:8-slim
WORKDIR /root/
COPY --from=0 /tmp/project/package.json .
COPY --from=0 /tmp/project/bin .
RUN npm install --production
ENTRYPOINT ["/root/pi-image-config"]
CMD ["--help"]
