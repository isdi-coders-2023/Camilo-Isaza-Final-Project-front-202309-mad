import { useHelmets } from '../../hooks/useHelmets';

import { HelmetsForm } from '../../components/edit_create_form/edit_create_form';

export default function EditFormPage() {
  const { currentHelmet } = useHelmets();

  if (!currentHelmet?.id) {
    return <HelmetsForm helmet={currentHelmet!} />;
  } else {
    return <HelmetsForm helmet={currentHelmet} />;
  }
}
