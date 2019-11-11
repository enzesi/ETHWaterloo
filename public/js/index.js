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
      //demo
      $("#demo").on('click', async function() {
        let account = (await web3.eth.getAccounts())[0]
        
        try {
          $.ajax({
            type: "POST",
            url: '/startSending',
            data: {account: account},
            dataType: 'json',
            success: function(result) {
              console.log('result! :', result)
              change()
            },
            error: function(error) {
              console.error('error:', error)
            }
          })
        }
        catch(error) {
          console.error('api error: ', error)
        }
       
        
      })


     
      //change function
      async function change() {
        if (quality >= 2) {
            quality = quality - 1;
            console.log(quality);
            document.getElementById("TTimage").src = "img/pic/" + quality + ".png";
        }
        let account = (await web3.eth.getAccounts())[0]
        let balance = await web3.eth.getBalance(account)
        // , function(error, balance) {
        //   if (error) {
        //     console.error('get balance error: ', error)
        //   }
          balance = web3.utils.fromWei(balance, "ether") 
          console.log('balance right now: ', balance)

          document.getElementById("EnzeBalance").innerHTML = balance;
        // })
        
        /* while (quality > 1) {
            quality = quality - 1;
            document.getElementById("TTimage").src = "img/" + quality + ".png";
        } */
    }
    }
    else {
      $('#msg').text('No web3 connection found Please use metamask !')
      $('#alertModal').modal();
    }
  })
});