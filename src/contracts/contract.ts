import { ethers, BigNumber } from 'ethers'
import detectEthereumProvider from "@metamask/detect-provider";
import { Abi } from "./abi";
import * as C from '../utils/constants'

class CallContract {
  private signer: ethers.providers.JsonRpcSigner | undefined
  private contract: ethers.Contract | undefined
  private readonly contractAddress: string
  address: string

  constructor(address: string) {
    this.address = address
    this.contractAddress = C.CONTRACT_ADDRESS
  }

  async init() {
    const p = await detectEthereumProvider()
    const provider = new ethers.providers.Web3Provider(p!)
    this.signer = provider.getSigner()
    const c = new ethers.Contract(this.contractAddress, Abi, this.signer);
    this.contract = c.connect(this.signer)
  }

  async allAds() {
    return await this.contract?.allAds()
  }

  async approveAd(adIndex: BigNumber) {
    return await this.contract?.approveAd(adIndex)
  }

  async adInfo(adIndex: BigNumber) {
    return await this.contract?.adInfo(adIndex)
  }
}

export default CallContract
