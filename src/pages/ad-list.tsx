import Header from '@/components/common/header'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button } from '@mui/material'
import CallContract from "@/contracts/contract";
import { useEffect, useState } from "react";
import * as C from '@/utils/constants'
import Image from 'next/image';
import { useRouter } from 'next/router'

interface Column {
  id: 'idx' | 'img' | 'category' | 'publisher' | 'inventory' | 'approved' | 'operate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: any) => any;
}

const columns: readonly Column[] = [
  { id: 'idx', label: 'AdIndex', minWidth: 170 },
  {
    id: 'img', label: 'Img', minWidth: 100,
    format: (value: string) => <Image src={ value } alt="AdMeta Ad Image" width={ 200 } height={ 150 }/>
  },
  {
    id: 'category', label: 'Category', minWidth: 100,
    format: (value: number) => <Chip label={ C.AD_CATEGORY[value].name } size="small"
                                     className={ `tw-bg-green-500 tw-text-white` }/>
  },
  {
    id: 'publisher',
    label: 'Publisher',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'inventory',
    label: 'Inventory',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'approved',
    label: 'Status',
    minWidth: 170,
    align: 'right',
    format: (value: boolean) => value ? <div className='tw-text-green-500'>Approved</div> :
      <div className='tw-text-blue-500'>Pending</div>,
  },
  {
    id: 'operate',
    label: 'Operate',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  idx: number;
  img: string;
  category: number;
  publisher: string;
  inventory: number;
  approved: boolean;
}

export default function AdList() {
  const [list, setList] = useState<Data[]>([])
  const router = useRouter()

  useEffect(() => {
    const c = new CallContract(C.CONTRACT_ADDRESS)
    c.init().then(() => {
      c.allAds().then(v => {
        let arr: Data[] = []
        v.forEach((item, index) => {

          arr.push({
            idx: index,
            img: item.metadata,
            category: item.category.toNumber(),
            publisher: item.publisher,
            inventory: item.inventory.toNumber(),
            approved: item.approved
          })
        })
        setList([...arr])
      })
    })
  }, [])

  const cell = (column: Column, value: string | boolean | number, row) => {
    if (column.id === 'operate') {
      return <Button
        variant="contained"
        className='tw-bg-blue-500'
        size="small"
        onClick={() => {
          router.push({
            pathname: '/ad-detail/[aid]',
            query: {aid: row.idx}
          })
        }}
      >Detail</Button>
    }
    if (column.format) {
      return column.format(value)
    }

    return value
  }

  return (
    <main className="tw-h-screen tw-overflow-hidden">
      <Header/>
      <div className='tw-px-10 tw-w-full tw-mt-20 tw-min-h-screen tw-overflow-hidden'>
        <TableContainer sx={ { maxHeight: 600 } }>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                { columns.map((column) => (
                  <TableCell
                    key={ column.id }
                    align={ column.align! }
                    style={ { minWidth: column.minWidth } }
                  >
                    { column.label }
                  </TableCell>
                )) }
              </TableRow>
            </TableHead>
            <TableBody>
              { list
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={ -1 } key={ row.idx }>
                      { columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={ column.id } align={ column.align! }>
                            { cell(column, value, row) }
                          </TableCell>
                        );
                      }) }
                    </TableRow>
                  );
                }) }
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </main>
  )
}
