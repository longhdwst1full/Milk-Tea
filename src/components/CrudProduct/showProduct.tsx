import { memo, useState } from 'react';
import { Button, Card, Textarea } from 'flowbite-react';
import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  ImageListItem,
  Stack,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { AiFillEye } from 'react-icons/ai';
import { IProduct } from '../../interfaces/products.type';
import { formatCurrency } from '../../utils/formatCurrency';

interface Props {
  product: IProduct;
}

const ShowProduct = ({ product }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  //   useEffect(() => {
  //     getDataTopping();
  //     getCategory();
  //   }, [DataCategory]);

  return (
    <div>
      <Button className="bg-yellow-500" onClick={() => setIsOpen(true)}>
        <AiFillEye />
      </Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="h-full overflow-y-auto no-scrollbar"
      >
        <Box
          sx={{
            width: '50rem',
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography className="p-6 bg-[#e2e8f0]" variant="h5" component="h3">
            Show Product
          </Typography>
          <Box
            sx={{ padding: '10px 0 10px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <Box>
              <Card>
                <CardHeader title={product.name} />
                <CardContent className="flex gap-2">
                  {product.images.map((url) => (
                    <Box key={url.publicId} className="flex flex-wrap gap-3">
                      <img src={url.url} width={300} alt="" />
                    </Box>
                  ))}
                  <Box>
                    <Box sx={{ fontWeight: 'bold' }}>
                      Category: <Button className="bg-green-400">{product.category.name}</Button>
                    </Box>
                    <Box sx={{ fontWeight: 'bold' }}>
                      Sizes:
                      <Box sx={{ display: 'flex', gap: '10px' }}>
                        {product.sizes.map((item) => (
                          <Button className="bg-orange-400">
                            {item.name}: {formatCurrency(item.price)}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ fontWeight: 'bold' }}>
                      Sales:{' '}
                      <Button className="bg-red-400">{formatCurrency(Number(product.sale))}</Button>
                    </Box>
                  </Box>
                </CardContent>
                <CardContent>
                  <Textarea readOnly>{product.description}</Textarea>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default memo(ShowProduct);
