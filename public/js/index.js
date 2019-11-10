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
      console.log(web3.version.network)
      if (web3.version.network !== '3') {
        $('#msg').text('Please switch to ropsten testnet and refresh page!')
        $('#alertModal').modal();
      }
      //demo
      
    }
    else {
      $('#msg').text('No web3 connection found Please use metamask !')
      $('#alertModal').modal();
    }
  })
});