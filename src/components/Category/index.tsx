import { Divider, List, ListItem, ListItemText, Paper, Popover, Stack, Typography } from '@mui/material'
import { Fragment, useState } from 'react'

import { FaBars } from 'react-icons/fa'
import { ICategory } from '../../interfaces/category.type'
import { useAppDispatch } from '../../store/hooks'
import { getIdCate } from '../../store/slices/categories'
import { savePage } from '../../store/slices/product.slice'

interface SidebarCateProps {
  categories: ICategory[]
}

const SidebarCate = ({ categories }: SidebarCateProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const dispatch = useAppDispatch()

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className='sidebar select-none shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit hidden lg:block'>
        <div className='border border-transparent border-b-[#f1f1f1] uppercase px-4 py-2'>Danh mục</div>
        <div className=''>
          <div
            onClick={() => dispatch(getIdCate(''))}
            className='cursor-pointer hover:bg-gray-100 transition-all duration-300 px-[16px] flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none'
          >
            <div className='cat-name capitalize'>All</div>
          </div>
          {categories &&
            categories?.length > 0 &&
            categories?.map((category: ICategory) => (
              <div
                onClick={() => {
                  dispatch(getIdCate({ idCate: category._id, nameCate: category.name }))
                  dispatch(savePage(1))
                }}
                key={category._id}
                className='cursor-pointer hover:bg-gray-100 transition-all duration-300 px-[16px] flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none'
              >
                <div className='cat-name capitalize'>{category.name}</div>
                <div className='cat-amount text-[#8a733f]'>{category.products?.length}</div>
              </div>
            ))}
        </div>
      </div>
      <div
        className='btn-menu cursor-pointer fixed bottom-[100px] left-[16px] bg-[#ee4d2d] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center z-[3] lg:hidden'
        onClick={handleClick}
      >
        <FaBars />
      </div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <Paper elevation={3} sx={{ width: '25rem' }}>
          <Fragment>
            <Typography component={'h1'} color='text.primary' fontWeight={500} padding={1}>
              Danh mục
            </Typography>
          </Fragment>
          <Divider />
          <List
            disablePadding
            sx={{
              width: '100%',
              maxHeight: 200,
              overflow: 'auto'
            }}
          >
            <Stack onClick={handleClose}>
              <ListItem>
                <ListItemText
                  className='cursor-pointer'
                  secondary={
                    <Fragment>
                      <Typography
                        component={'span'}
                        className='flex justify-between w-full'
                        color='text.primary'
                        fontSize={13}
                      >
                        All
                      </Typography>
                    </Fragment>
                  }
                  onClick={() => dispatch(getIdCate(''))}
                />
              </ListItem>
              <Divider sx={{ marginLeft: '16px' }} />
            </Stack>
            {categories &&
              categories?.length > 0 &&
              categories?.map((category: ICategory) => (
                <Stack key={category._id} onClick={handleClose}>
                  <ListItem>
                    <ListItemText
                      className='cursor-pointer'
                      secondary={
                        <Fragment>
                          <Typography
                            component={'span'}
                            className='flex justify-between w-full'
                            color='text.primary'
                            fontSize={13}
                          >
                            {category.name}
                            <span>{category.products?.length}</span>
                          </Typography>
                        </Fragment>
                      }
                      onClick={() => dispatch(getIdCate({ idCate: category._id, nameCate: category.name }))}
                    />
                  </ListItem>
                  <Divider sx={{ marginLeft: '16px' }} />
                </Stack>
              ))}
          </List>
        </Paper>
      </Popover>
    </>
  )
}

export default SidebarCate
