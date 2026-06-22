FROM ubuntu:25.10

# Dependencies
RUN apt-get update && apt-get install -y curl xz-utils libatomic1

# Install Golang
RUN curl -OL https://go.dev/dl/go1.26.3.linux-amd64.tar.gz
RUN rm -rf /usr/local/go && tar -C /usr/local -xzf go1.26.3.linux-amd64.tar.gz
ENV PATH=$PATH:/usr/local/go/bin

# Install NodeJS
RUN curl -fsSL https://nodejs.org/dist/v26.2.0/node-v26.2.0-linux-x64.tar.xz | \
    tar -xJ -C /usr/local --strip-components=1

# Setup Project
COPY . /app

# Setup GO
WORKDIR /app/backend
RUN go build -o ../edgarcodesdev

# Setup Node
WORKDIR /app/frontend
RUN npm install
RUN npm run build

WORKDIR /app
ENTRYPOINT [ "./edgarcodesdev" ]