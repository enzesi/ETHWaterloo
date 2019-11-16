$(document).ready( async function() {
  window.addEventListener('load', async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      window.web3 = new Web3(ethereum)
      console.log('detected!')
      try {
        await ethereum.enable()
      }
      catch(error) {
        console.error('enable web3 error')
      }
      if (web3.version.network !== '3') {
        $('#msg').text('Please switch to ropsten testnet and refresh page!')
        $('#alertModal').modal();
      }
      let quality = 50;
      let level = 2;

      //init


      let enzeBalance = await web3.eth.getBalance('0xd302251CD0bCF47f39F810a782Dd33384f62fEc5')
      enzeBalance = web3.utils.fromWei(enzeBalance, "ether") 
      let richardBalance = await web3.eth.getBalance('0x4308C4533006420aCf64430442caa4653D2F2355')
      richardBalance = web3.utils.fromWei(richardBalance, "ether") 
      document.getElementById("EnzeBalance").innerHTML = enzeBalance;
      document.getElementById("RichardBalance").innerHTML = richardBalance;



      //demo
      $("#demo").on('click', async function() {
        let account = (await web3.eth.getAccounts())[0]
        let count = 0
        while ( count < 50) {
          await send(account)
          await delay(350)
          count++;
        }
      })
      //change function
      async function change() {
        if (quality >= 2) {
            quality = quality - 1;
            console.log(quality);
            document.getElementById("TTimage").src = "img/pic/image-" + quality + ".png";
            document.getElementById("EnzeLevel").textContent = "\u00A0\u00A0\u00A0\u00A0\u00A0" + level;
            level = level + 1;
        }
        let account = (await web3.eth.getAccounts())[0]
        let balance = await web3.eth.getBalance(account)
        balance = web3.utils.fromWei(balance, "ether") 
        console.log('balance right now: ', balance)
        document.getElementById("EnzeBalance").innerHTML = balance;

        let richardBalance = await web3.eth.getBalance('0x4308C4533006420aCf64430442caa4653D2F2355')
        richardBalance = web3.utils.fromWei(richardBalance, "ether") 
        document.getElementById("RichardBalance").innerHTML = richardBalance;
      }

      //ajax call
      async function send(account) {
        try {
          $.ajax({
            type: "POST",
            url: '/startSending',
            data: {account: account},
            dataType: 'json',
            success: async function(result) {
              console.log('result! :', result)
              await change()
            },
            error: function(error) {
              console.error('error:', error)
            }
          })
        }
        catch(error) {
          console.error('api error: ', error)
        }
      }

      async function delay(ms) {
        return await new Promise(resolve => setTimeout(resolve, ms));
      }
    }
    else {
      $('#msg').text('No web3 connection found Please use metamask !')
      $('#alertModal').modal();
    }
  })
});