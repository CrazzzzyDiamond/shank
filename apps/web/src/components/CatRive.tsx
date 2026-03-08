import { useEffect } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

const STATE_MACHINE = 'State Machine 1';

interface Props {
  cents: number | null;
  success: boolean;
}

export function CatRive({ cents, success }: Props) {
  const { rive, RiveComponent } = useRive({
    src: `${import.meta.env.BASE_URL}3613-7557-wake-up-the-black-cat.riv`,
    stateMachines: STATE_MACHINE,
    autoplay: true,
  });

  const isHovered = useStateMachineInput(rive, STATE_MACHINE, 'IsHovered');

  const inTune = cents !== null && Math.abs(cents) <= 15;

  useEffect(() => {
    if (isHovered) isHovered.value = inTune || success;
  }, [inTune, success, isHovered]);

  return <RiveComponent style={{ width: 384, height: 384 }} />;
}
