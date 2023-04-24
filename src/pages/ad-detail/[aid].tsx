import Header from '@/components/common/header'
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CallContract from "@/contracts/contract";
import * as C from "@/utils/constants";
import { BigNumber } from "ethers";
import { Button } from "@mui/material";

interface Data {
  idx?: number;
  img: string;
  category: number;
  publisher: string;
  inventory: number;
  approved: boolean;
  reward: number;
  target: string;
  title: string;
}

export default function AdDetail() {
  const [detail, setDetail] = useState<Data>()
  const [ctx, setCtx] = useState<any>()

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query } = useRouter()


  useEffect(() => {
    const c = new CallContract(C.CONTRACT_ADDRESS)
    const aid = BigNumber.from(query.aid)
    c.init().then(() => {
      setCtx(c)
      c.adInfo(aid).then(v => {
        setDetail({
          img: v[4],
          category: v[0].toNumber(),
          publisher: v[1],
          inventory: v[2].toNumber(),
          approved: v[7],
          reward: v[3].toNumber(),
          target: v[6],
          title: v[5],
        })
      })
    })
  }, [query.aid])

  return (
    <main className="tw-h-screen tw-overflow-hidden">
      <Header/>
      <div className='tw-p-10 tw-flex tw-justify-start tw-items-start'>
        <div>
          {
            detail?.img
            &&
            <Image
              src={ detail.img }
              width={ 500 }
              height={ 250 }
              alt={ 'AdMeta Ad Image' }
            />
          }
        </div>
        <div className='tw-ml-20'>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Name:</div>
            <div>{ detail?.title }</div>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Publisher:</div>
            <div>{ detail?.publisher }</div>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Category:</div>
            {detail?.category && <div>{ C.AD_CATEGORY[detail?.category].name }</div>}
            <Button
              variant="contained"
              className='tw-bg-blue-500 tw-rounded-full tw-text-sm tw-ml-4'
              size={'small'}
              onClick={ () => {
              } }
            >Update Category</Button>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Inventory:</div>
            <div>{ detail?.inventory }</div>
            <Button
              variant="contained"
              className='tw-bg-blue-500 tw-rounded-full tw-text-sm tw-ml-4'
              size={'small'}
              onClick={ () => {
              } }
            >Update Inventory</Button>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Reward:</div>
            <div>{ detail?.reward }</div>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Target:</div>
            <div>{ detail?.target }</div>
            <Button
              variant="contained"
              className='tw-bg-blue-500 tw-rounded-full tw-text-sm tw-ml-4'
              size={'small'}
              onClick={ () => {
              } }
            >Update Target</Button>
          </div>
          <div className='tw-flex tw-justify-start tw-items-center tw-mb-4'>
            <div className='tw-font-bold tw-text-xl tw-mr-4'>Status:</div>
            <div>{ detail?.approved ? 'Approved' : 'Pending' }</div>
            {
              detail?.approved
              ?
                <Button
                  variant="contained"
                  className='tw-bg-red-500 tw-rounded-full tw-text-sm tw-ml-4'
                  size={'small'}
                  onClick={ () => {
                  } }
                >Reject</Button>
                :
                <Button
                  variant="contained"
                  className='tw-bg-blue-500 tw-rounded-full tw-text-sm tw-ml-4'
                  size={'small'}
                  onClick={ () => {
                    const aid = BigNumber.from(query.aid)
                    ctx.approveAd(aid).then()
                  } }
                >Approve</Button>
            }
          </div>
        </div>

      </div>
    </main>

  )
}
