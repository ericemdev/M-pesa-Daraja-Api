<script>
    let usd = 18.43;
    let kes = 2491.33;
    let transactions = [
      { type: 'Add', method: 'M-Pesa Kenya', amount: 'KSh135.18', date: 'May 06, 2024', status: 'Completed' },
      { type: 'Withdraw', method: 'M-Pesa Kenya', amount: 'KSh256.49', date: 'Apr 20, 2024', status: 'pending' }
    ];

    let phoneNumber = '';
        let amount = '';
        let paymentStatus = '';
        let isLoading = false;
        let selectedCountry = '';
        let selectedCountryName = ''; 
        let selectedFlagUrl = ''; 
        let showDropdown = false;
        const countries = [
          { code: "+254", name: "Kenya", flagCode: "ke" },
          { code: "+255", name: "Tanzania", flagCode: "tz" },
          { code: "+258", name: "Mozambique", flagCode: "mz" },
          { code: "+243", name: "DRC", flagCode: "cd" },
          { code: "+266", name: "Lesotho", flagCode: "ls" },
          { code: "+233", name: "Ghana", flagCode: "gh" },
          { code: "+20", name: "Egypt", flagCode: "eg" },
          { code: "+93", name: "Afghanistan", flagCode: "af" },
          { code: "+27", name: "South Africa", flagCode: "za" },
          { code: "+251", name: "Ethiopia", flagCode: "et" },
        ];
        function handleDeposit() {
            handlePayment();
            }
      
        function selectCountry(country) {
          selectedCountry = country.code;
          selectedCountryName = country.name;
          selectedFlagUrl = `https://flagcdn.com/w20/${country.flagCode}.png`;
          updatePhoneNumber();
          toggleDropdown(); 
        }
      
        function updatePhoneNumber() {
          phoneNumber = selectedCountry;
        }
      
        function toggleDropdown() {
          showDropdown = !showDropdown;
        }
      
        async function handlePayment() {
          isLoading = true;
          paymentStatus = '';  
      
          const headers = new Headers();
          headers.append("Content-Type", "application/json");
          headers.append("Authorization", "Bearer <your_access_token_here>");
      
          const bodyData = {
            "BusinessShortCode": "174379",
            "Password": "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3",
            "Timestamp": "20160216165627",
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,
            "PartyA": +254707819218,
            "PartyB": "600000",
            "PhoneNumber": +254707819218,
            "CallBackURL": "https://mydomain.com/callback",
            "AccountReference": "Test",
            "TransactionDesc": "Test"
          };
      
          try {
            const response = await fetch("http://localhost:3000/mpesa/stkpush", {
              method: 'POST',
              headers,
              body: JSON.stringify(bodyData)
            });
      
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const data = await response.json();
            paymentStatus = 'Payment initiated successfully!';
            console.log('Payment initiated:', data);
          } catch (error) {
            console.error('Error:', error);
            paymentStatus = `Error: ${error.message}`;
          } finally {
            isLoading = false;
          }
        }
  </script>

<main>

  <div class="flex justify-center pt-4">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="green" class="w-10 h-10">
      <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clip-rule="evenodd" />
    </svg>
    
  </div>
    <div class="text-center p-4">
        <div><span class="font-extrabold"></span></div>
        <div class="text-lg font-bold">${usd.toFixed(2)} USDC</div>
        <div>KSh{kes.toFixed(2)} KES</div>
    </div>
    
    <div class="grid grid-cols-3 gap-4 p-4">
        <button on:click={toggleDropdown} class="bg-green-200 text-sm font-bold rounded-lg shadow p-4 flex justify-center items-center">
          Deposit
        </button>
        <button class="bg-green-200 text-sm font-bold rounded-lg shadow p-4 flex justify-center items-center">
          Withdraw
        </button>
        <button class="bg-green-200 text-sm font-bold rounded-lg shadow p-4 flex justify-center items-center">
          Transfer 
        </button>
      </div>
      <div class="flex justify-center pt-8">
          <div class="bg-green-300 shadow rounded-lg p-4 m-6 mb-6" style="width: 300px;">
            <span class="text-black italic">Deposit not reflecting?</span>
            <a href="/" class="border-b border-black text-blue-700">Contact support</a>
          </div>
      </div>
      {#if showDropdown}
      <div class="p-4 bg-white shadow-md rounded-md">
        <div class="flex flex-col items-center mb-2 space-y-4">
          <select class="mr-2 border border-gray-300 rounded-md" bind:value={selectedCountry}>
            {#each countries as country}
              <option value={country.code}>{country.name} ({country.code})</option>
            {/each}
          </select>
          <input type="text" placeholder="Phone number" class="mr-2 border border-gray-300 rounded-md p-2 rounded" bind:value={phoneNumber}>
          <input type="text" placeholder="Amount" class="mr-2 border border-gray-300 rounded-md p-2 rounded" bind:value={amount}>
          <button on:click={handleDeposit} class="bg-green-500 text-white rounded-md px-4 py-2">Deposit</button>
          <p class="text-gray-600 text-xs italic">Minimum deposit 10 tokens</p>
        </div>
        {#if paymentStatus}
        <div class="bg-yellow-100 rounded-lg shadow p-4 my-2">
          <p>{paymentStatus}</p>
        </div>
        {/if}
      </div>
      {/if}
      <div class="p-4">
        <h2 class="font-semibold text-white">Recent</h2>
        {#each transactions as transaction}
          <div class="bg-green-100 rounded-lg shadow p-4 my-2">
            <p>{transaction.type}  {transaction.method}</p>
            <p>{transaction.amount}</p>
            <p>{transaction.date}</p>
            <span class="text-yellow-500">{transaction.status}</span>
          </div>
        {/each}
      </div>
</main>