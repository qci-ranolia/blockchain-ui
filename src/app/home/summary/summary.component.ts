import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../../service/ProjectService';
import { DomSanitizer } from '@angular/platform-browser';
// var CryptoJS = require("crypto-js");
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() info: any;
  header: any = [];
  data: any;
  arr: any = [];
  showSummary = false;
  showViewAll = false;
  shareWithAddress = false;
  shareWithAddressData: any;
  trail_view = false;
  options = {};
  trail_data = [];
  f_headers: any = [];
  tempArray: any = [];
  emt1: any;
  emt2: any;
  emt3: any;
  showFileButton= false;
  newDesign : boolean = false

  png: any;
  // fileUrl;
  

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    key : any;
    encrypted_hex_string : any;
    encrypted_hex_array : any;
    encrypted_hex_key : any;
    aes_key : any;
    hmac_key : any;
    iv : any;
    mac : any;
    cipherText : any;
    encrypted : any;
  //////////////////////////////////////////////////////
    base64_cipher: any;
    decrypted : any
    awsUrlBase64 : any

  constructor( private ProjectService: ProjectService, private _sanitizer: DomSanitizer ) {
    trail_view: false;
    this.emt1 = this.ProjectService.emitSummary.subscribe(res => {
      // console.log(res)
      this.showViewAll = false;
      this.shareWithAddress = false;
      this.header = [];
      this.data = [];
      this.f_headers = [];
      this.trail_data = [];
      this.arr = [];
      this.tempArray = [];
      this.options = {};
      this.arr = [];
      this.header = [];

      this.showSummary = true;
      this.header = res.header;
      this.data = res.data;

      // json to array
      this.data = JSON.stringify(this.data);
      let parsed = JSON.parse(this.data);

      for (let x in parsed) {
        this.arr.push(parsed[x]);
      }
      // console.log(parsed);
      let action = this.ProjectService.globalAction;
      if ( this.ProjectService.globalAction === "Accounts" ) {
        this.showViewAll = true;
      }
      if ( this.ProjectService.globalAction === "Receive" ) {
        if (res.data) {
          if (res.data.shared_assets_count) {
            if (res.data.shared_assets_count > 0) {
              this.showViewAll = true;
            }
          }
        }
        let tempData = JSON.parse(this.data);
        if (tempData.to_org_address) {
          this.showViewAll = false;
        }
      }
      //////////////////////////////////////////////////////////////////////////////////////
      //////////////////////XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX////////////////////
      //////////////////////////////////////////////////////////////////////////////////////
      if(action === "Assets") {
        // console.log(res.data.key)
        var spaceRegEx = res.data.decrypted_url.replace(/ /g, "%20")
        // this.ProjectService.awsUrl(spaceRegEx)
        var request = new XMLHttpRequest()
        request.open('GET', spaceRegEx, true)
        request.send(null)
        request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 200) {
            var type = request.getResponseHeader('Content-Type')
            if (type.indexOf("text") !== 1) {
              return request.responseText;
            }
          }
        }

        setTimeout(() => {
          this.key = res.data.key /* "04c1fa761a2442fd4a5eb4b5c11b57b8615143d8d4a6ffadc962855ec1e96d06dffb8706fe71bbaf536273718d159ea04f2a267f0570fe7bcb8ee4445117b021" */
          // console.log(request.responseText)
          // this.encrypted_hex_string = this.base64ToHex(request.responseText) /* "0fdebc8a745eaa2289009466407908cbed38b081c7e14048ddac018560392ddf55780b92f4e08fcf9a6ff2f3315cebb1006367b1c0b092c12a4f6d3021f8" */
          
          // console.log(this.encrypted_hex_string)
          // this.encrypted_hex_array = this.toByteArray(this.encrypted_hex_string)
          // this.encrypted_hex_key = this.toByteArray(this.key)
          
          // this.aes_key = CryptoJS.enc.Hex.parse(res.data.key)
          
          // this.cipherText = CryptoJS.enc.Hex.parse(request.responseText)

          // this.iv = this.cipherText.slice(0, 16)
          // this.mac = this.cipherText.slice(-32) // Message Authentication Code // Hash
          // this.hmac_key = this.aes_key.slice(32)
          
          this.encrypted_hex_array = this.toByteArray(request.responseText)
          this.encrypted_hex_key = this.toByteArray(res.data.key)
          
          this.aes_key = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_key.slice(0, 32)))
          this.hmac_key = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_key.slice(32)))
          
          this.iv = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_array.slice(0, 16)))
          
          this.mac = this.toHexString(this.encrypted_hex_array.slice(-32))
          this.cipherText = this.toHexString(this.encrypted_hex_array.slice(16, -32))
          this.encrypted = CryptoJS.enc.Hex.parse(this.cipherText)

          // this.aes_key = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_key.slice(0, 32)))
          // this.hmac_key = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_key.slice(32)))
          // this.iv = CryptoJS.enc.Hex.parse(this.toHexString(this.encrypted_hex_array.slice(0, 16)))
          // this.mac = this.toHexString(this.encrypted_hex_array.slice(-32)) // Message Authentication Code // Hash
          
          // console.log(this.encrypted_hex_array)
          // this.cipherText = this.toHexString(this.encrypted_hex_array.slice(16, -32))
          // console.log(this.cipherText)
          
          // this.encrypted = CryptoJS.enc.Hex.parse(this.cipherText)
          // console.log(this.encrypted)
          // this.base64_cipher = this.hexToBase64(this.cipherText)                          
          
          // console.log(this.base64_cipher)
          // console.log(this.iv)
          this.decrypted = CryptoJS.AES.decrypt(this.cipherText, this.aes_key, {
             mode: CryptoJS.mode.CTR,
             iv: this.iv,
             padding: CryptoJS.pad.NoPadding
          })
          
          // console.log(this.decrypted)
          // console.log(this.hmac_key)
          var HMAC = CryptoJS.HmacSHA256(this.decrypted.toString(CryptoJS.enc.Utf8), this.hmac_key)
          console.log(HMAC)
          // console.log("HMAC", HMAC.toString())
          // console.log("MAC", this.mac)
          if ( HMAC.toString() !== this.mac ) {
            console.log("Something is incorrect.")
          }
          // console.log(this.decrypted.toString(CryptoJS.enc.Utf8))  
        }, 1500)
       
        
        // // Use the decodedData instead of the base64 one
        // var blob = new Blob([parsed.decrypted_data], {type: 'image/png'});
        // console.log(blob)
        // // // It should work properly
        // var file = new File([blob], 'file.png', {type: "image/png"});
        // this.png = file.name
        // console.log(this.png)
        // this.png = this._sanitizer.bypassSecurityTrustUrl(`${'data:image/png;base64,' + parsed.decrypted_data}`); //'data:image/png;base64,' + parsed.decrypted_data
      
        this.shareWithAddress= true;
        if(parsed.decrypted_url){
          this.showFileButton = true;
        }
        let tempData =  JSON.parse(this.data);
        if(tempData.address) {
          this.shareWithAddressData = tempData.address;
        }
      }

      this.f_headers = res.f_Headers;
      this.f_headers = JSON.stringify(this.f_headers);
      let tempArr = JSON.parse(this.f_headers);
      for (let x in tempArr) {
        this.tempArray.push(tempArr[x])
      }

    })

    this.emt2 = this.ProjectService.emitHideSummary.subscribe( res => {
      this.showSummary = false
      this.trail_view = false
      this.newDesign = false
      this.showFileButton= false
    
    })

    this.emt3 = this.ProjectService.emitTrailView.subscribe( res => {
      this.newDesign = true
      this.trail_view = true
      this.trail_data = res
      // console.log(this.trail_data);
      // console.log(this.data1);
      // this.displayTrailView(trail_data);
    })
  }

  ngOnInit() { }

  toByteArray(hexString) {
    // console.log(hexString.length)
    var result = []
    while (hexString.length >= 2) {
      result.push(parseInt(hexString.substring(0, 2), 16))
      hexString = hexString.substring(2, hexString.length)
    }
    // console.log(result)
    // console.log(hexString) // Blank
    // console.log(hexString.length) // hextstring is blank so length is zero...
    return result
  }

  toHexString(byteArray) {
    // console.log(byteArray)
    // console.log(byteArray.length)    
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2)
    }).join('')
  }

  hexToBase64(hexstring) {
    return btoa(hexstring.match(/\w{2}/g).map(function(a) {
      return String.fromCharCode(parseInt(a, 16))
    }).join(""))
  }

  base64ToHex(base64) {
    var raw = atob(base64);
  
    var HEX = '';
  
    for ( let i = 0; i < raw.length; i++ ) {
      var _hex = raw.charCodeAt(i).toString(16)
      HEX += (_hex.length==2?_hex:'0'+_hex);
    }

    return HEX//.toUpperCase();  
  }

  viewFile() {
    let parsed = JSON.parse(this.data);
    // console.log(parsed.decrypted_url);
    this.ProjectService.getFileData(parsed.decrypted_url);
  }

  viewAll() {
    if (this.ProjectService.globalAction === "Accounts") {
      let temp = JSON.parse(this.data)
      this.ProjectService.viewAll(temp.email);
    }
    if (this.ProjectService.globalAction === "Receive") {
      let tempData = JSON.parse(this.data);
      // console.log(tempData)
      if(tempData.address) {
        // console.log(tempData.address)
        this.ProjectService.viewAllReceiveAssets(tempData.address);
      }
    }
  }

  tableService(m) {
    return this.tempArray[m];
  }

  dataService(m) {
    // console.log(m);
    // console.log(this.arr[m]);
    return this.arr[m];
  }

  // Only in share assets
  createNewShareForm() {
    this.ProjectService.shareWithAddressData = true;
    localStorage.setItem("shareWithAddressData", this.shareWithAddressData + "")
    // console.log(this.ProjectService.navigationData);
    this.ProjectService.createNewFormElements(this.ProjectService.navigationData[2].createForm2);
    this.ProjectService.createNewForm();
  }

  displayTrailView(trail_data) {
    this.options = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove'
      },
      series:
        [
          {
            type: 'tree',
            data: [trail_data],
            left: '2%',
            right: '2%',
            top: '8%',
            orient: 'vertical',
            expandAndCollapse: true,
            leaves: {
              label: {
                normal: {
                  position: 'bottom',
                  verticalAlign: 'center',
                  align: 'center'
                }
              }
            },
            symbolSize: 12,
            label: {
              normal: {
                position: 'center',
                verticalAlign: 'center',
                align: 'center',
                fontSize: 12
              }
            },
            itemStyle: {
              color: '#ff4ca6',
              borderColor: '#ff4ca6'
            },
            lineStyle: {
              color: '#ff4ca6',
              curveness: 0.9
            },/*
            tooltip:{
              backgroundColor:'rgba(0,0,0,0.7)',
              borderColor:'#000'
            }, */
            animationDurationUpdate: 750
          }
        ]
    };
  }
  ngOnDestroy() {
    this.emt1.unsubscribe();
    this.emt3.unsubscribe();
    this.emt2.unsubscribe();
  }
}
