## User Journey

### 1. Receive
TransactionId = generate
Timestamp(datetime) = gen
Amount(long) = set
TokenTicker(string) = set
FromAccountId(string) = set
ToAccountId(string) = gen / set

### 2. Register
AccountInfo: create

### 3. Activate
TokenBook: create transactions: VirtualUser -> RealUser

### 4. View Account

### 5. Spend / Withdraw
TokenBook: create transactions: RealUser > External

## Developer Journey

### Register
AccountInfo: create
### Deposit / Issue
TokenBook: create transaction

### CampaignSetup
TokenBook: create transaction: TokenDropClient >
### Distribute
Same as receive

### Analytics
N/A

## Database Table
```text
Table TokenBook

TransactionId(string)
Timestamp(datetime)
Amount(long)
TokenTicker(string)
FromAccountId(string)
ToAccountId(string)

AccountInfo
Type: TokenDropClient, RealUser, Campaign, VirtualUser, External
Id
VirtualAccountIds
```

## Devel
  ```bash
  curl --request GET \
    --url 'http://0.0.0.0:3000/api/HsyListings' \
    --header 'accept: application/json' \
    --header 'content-type: application/json' \
    --header 'x-ibm-client-id: default' \
    --header 'x-ibm-client-secret: SECRET' \
    --insecure
   ```

- Or visits local instance at http://0.0.0.0:3000/api/HsyListings/f8e40c34-e09a-4c2f-abb2-c5fe685338be

### Through UI

  - Through CLI, run `npm start`

## Working with Ionic

  Generate Angular2 SDK

  ```bash
  ./node_modules/.bin/lb-sdk server/server \
  <client source code> \
  -d ng2web -i disabled -v enabled
  ```

  for example, for `airdropper-client`

  ```bash
  ./node_modules/.bin/lb-sdk server/server \
  ../airdropper-client/client/src/loopbacksdk \
  -d ng2web -i disabled -v enabled
  ```

