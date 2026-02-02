# Notification Service – RabbitMQ Consumer (Direct + Fanout)
## Event-Driven Microservices using NestJS + PostgreSQL

This Notification Service acts as a **consumer service** in a RabbitMQ-based microservices architecture.
It listens for events published by the Post Service and processes notifications accordingly.

This project demonstrates how **real-world backend systems** consume events from message brokers
to perform tasks independently without tight coupling between services.

The goal of this service is to show **how consumer services react to events**
in a scalable, reliable, and decoupled manner.

---

## What is RabbitMQ (Easy Explanation)

RabbitMQ is a **message broker** that sits between services.

Instead of one service directly calling another service,
messages flow through RabbitMQ like this:

Producer → Exchange → Queue → Consumer

This approach ensures:

- Loose coupling between services
- Asynchronous communication
- Better scalability
- No dependency on producer availability

---

## RabbitMQ Exchange Types (Concept)

RabbitMQ supports **4 types of exchanges**:

- Direct Exchange
- Fanout Exchange
- Topic Exchange
- Headers Exchange

In this project, I have implemented **2 exchange types**:

- Direct Exchange
- Fanout Exchange

These two are the most commonly used patterns in real production systems.

---

## Why Direct and Fanout Only?

Direct and Fanout exchanges cover most backend use cases:

- **Direct Exchange**
  - One message → one queue → one consumer
  - Used for task-based or command-based processing

- **Fanout Exchange**
  - One message → multiple queues → multiple consumers
  - Used for event broadcasting (publish-subscribe)

Topic and Headers exchanges are intentionally skipped
to keep the architecture simple and focused.

---

## Messaging Patterns Implemented

### 1. Direct Exchange (Point-to-Point)

Used when only one consumer should process a message.

Flow:
Post Service → Direct Exchange → Single Queue → Notification Service

Use cases:

- Send email
- Send SMS
- Update user activity

In this project:

- Notification Service listens to a direct queue
- Only one notification consumer receives the message

---

### 2. Fanout Exchange (Publish-Subscribe)

Used when **multiple services** need to react to the same event.

Flow:
Post Service → Fanout Exchange → Multiple Queues → Multiple Consumers

Use cases:

- Send push notifications
- Update analytics
- Trigger logging
- Notify multiple subsystems

---

## Real-World Flow Implemented

When a post is created:

1. Post Service publishes an event to RabbitMQ
2. Notification Service consumes the event
3. Notifications are sent independently

Notification Service does NOT care:

- Which service produced the message
- How many other consumers receive the message
- Whether the producer is currently down

This is how large-scale systems are designed.

---

## Tech Stack Used

- NestJS
- RabbitMQ
- @nestjs/microservices
- PostgreSQL
- TypeORM
- amqplib
- amqp-connection-manager
- Docker (RabbitMQ)
- RabbitMQ Management UI
- Postman

---

## Project Folder Structure

```
src/
├── database/
│   └── entities/
│       └── notification.entity.ts
├── modules/
│   └── notification/
│       ├── notification.controller.ts
│       └── notification.service.ts
├── app.module.ts
└── main.ts
```

---

## Setup Instructions

### Clone Repository
git clone <https://github.com/Deeksha1108/RabbitMQ_NotificationService.git>
cd notification-service
npm install

---

### Start RabbitMQ using Docker
docker run -d \
--hostname rabbitmq \
--name rabbitmq \
-p 5672:5672 \
-p 15672:15672 \
rabbitmq:3-management

RabbitMQ Dashboard:
http://localhost:15672

Username: guest
Password: guest

---

### Start Notification Service
npm run start:dev

---

## API Endpoint (Optional)

This service mainly consumes messages, so API endpoints are minimal.
Example endpoint for testing:

POST /notifications/test

Request Body:

{
  "message": "Hello Notification Service"
}

---

## Internal Working (Step-by-Step)

1. Notification Service consumes messages from RabbitMQ
2. Exchange routes the message:
   - Direct → single queue
   - Fanout → multiple queues
3. Notifications are processed:
   - Emails
   - Push notifications
   - Logging
4. Each consumer acts independently

---

## RabbitMQ Management UI Verification

Open:
http://localhost:15672

Check:

- Exchanges → Direct / Fanout exchanges
- Queues → Notification queues
- Bindings → Exchange-to-queue mapping
- Message rates → publish / deliver metrics

Note:
If consumers acknowledge messages, they may disappear from queues — normal behavior.

---

## Production-Level Concepts Applied

- Event-driven architecture
- Loose coupling
- Asynchronous messaging
- Fault tolerance
- Horizontal scalability
- Clean separation of concerns
- No direct service-to-service dependency

---

## What I Learned from This Project

- How **RabbitMQ** works for consumers
- Difference between **Direct and Fanout exchanges**
- How publish-subscribe systems work
- How NestJS integrates RabbitMQ consumers
- How to decouple services in production
- How to monitor message flow using RabbitMQ UI

---

## Made By Deeksha

This **Notification Service** demonstrates **real-world RabbitMQ consumer** integration
using NestJS with both **Direct and Fanout** messaging patterns.
It acts as a clean **consumer service** in an **event-driven architecture**.
