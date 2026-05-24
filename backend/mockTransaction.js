const { createClient } = require('@supabase/supabase-js');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

// Setup Supabase client
const supabaseUrl = 'https://ttjorlieygyiqsjynsjy.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0am9ybGlleWd5aXFzanluc2p5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDA2NDgxNiwiZXhwIjoyMDY5NjQwODE2fQ.X5pmKgVZFrjHHX_Jlmx6k5bEhcObadCwsgRJ47UGQxg'; // Service role key only used on backend

const supabase = createClient(supabaseUrl, supabaseServiceKey);

function generateTransaction(startupId, balance) {
  const isCredit = faker.datatype.boolean();
  const amount = parseFloat(faker.finance.amount(100, 5000, 2));
  const finalAmount = isCredit ? amount : -amount;

  return {
    startup_id: startupId,
    date: faker.date.recent({ days: 30 }),
    amount: finalAmount,
    type: isCredit ? 'credit' : 'debit',
    category: isCredit ? 'invoice' : faker.helpers.arrayElement(['salary', 'rent', 'utilities']),
    balance: balance + finalAmount,
  };
}

async function insertMockTransactions() {
  const { data: startups, error } = await supabase.from('startups').select('id');
  if (error) {
    console.error("Error fetching startups:", error);
    return;
  }

  for (const startup of startups) {
    let balance = 10000; // starting balance

    const transactions = Array.from({ length: 20 }, () => {
      const tx = generateTransaction(startup.id, balance);
      balance = tx.balance;
      return tx;
    });

    const { error: insertError } = await supabase.from('transactions').insert(transactions);
    if (insertError) {
      console.error("Insert error:", insertError);
    } else {
      console.log(`Inserted ${transactions.length} transactions for startup ${startup.id}`);
    }
  }
}

insertMockTransactions();
