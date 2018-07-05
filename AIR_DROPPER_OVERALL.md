## User Journey

### 1. Receive
TransactionId = generate
Timestamp(datetime) = gen
Amount(long) = set
TokenTicker(string) = set
FromAccountId(string) = set
ToAccountId(string) = gen / set

### 2. Wallet
TokenBook: show transactions

### 3. Activate
TokenBook: create transactions: VirtualUser -> RealUser

### 4. Register
AccountInfo: create

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
Ticker(string)
FromAccountId(string)
ToAccountId(string)

AccountInfo
Type: TokenDropClient, RealUser, Campaign, VirtualUser, External
Id
VirtualChannel: WeChatId, Email, PhoneNumber
VirtualAccountIds


```
