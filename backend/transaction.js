const {Account} = require('./db')

//Bank tries to be Atomic:::::you want multiple databases transactions to be atomic
// Either all of them should update, or none should

//issue>?
// What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)
// What if the Node.js crashes after the first update?

// It would lead to a database inconsistency. Amount would get debited from the first user, and not credited into the other users account.

// If a failure ever happens, the first txn should rollback.

// This is what is called a transaction in a database. 

const transferFunds = async(fromAccountId,toAccountId,amount)=>{
    //Decrement the amount from fromAccount
    await Account.findByIdAndUpdate(fromAccountId,{$inc:{balance:-amount}})

    //Increment the balance of the toAcc
    await Account.findByIdAndUpdate(toAccountId,{$inc:{balance:amount}})
}

//example:
transferFunds('fromAccountID','toAccountID',1000)