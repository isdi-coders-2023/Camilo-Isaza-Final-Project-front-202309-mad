import { useParams } from 'react-router-dom';
import { useHelmets } from '../../hooks/useHelmets';
import { Helmet } from '../../model/helmet';
import { HelmetsForm } from '../../components/edit_create_form/edit_create_form';
import { useEffect } from 'react';

export default function EditFormPage() {
  const { loadHelmets, helmets } = useHelmets();

  useEffect(() => {
    loadHelmets();
  }, [loadHelmets]);

  console.log(helmets);

  const { id } = useParams();

  let emptyHelmet = {
    id: '',
    reference: '',
    inventory: 0,
    price: 0,
    category: '',
    images: {
      publicId: '',
      size: 0,
      width: 0,
      height: 0,
      format: '',
      url: '',
    },
    orders: [],
  };

  let helmet: Helmet | undefined;

  if (id) {
    helmet = helmets.find((item: Helmet) => item.id === id);

    if (!helmet) {
      return (
        <>
          <p>Invalid ID</p>
        </>
      );
    }

    return <HelmetsForm helmet={helmet} />;
  } else {
    return <HelmetsForm helmet={emptyHelmet} />;
  }
}
