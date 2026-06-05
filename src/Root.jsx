import { Composition } from 'remotion';
import './index.css';

const MyVideo = () => {
  return (
    <div style={{ flex: 1, backgroundColor: 'var(--bg)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, fontFamily: 'Barlow Condensed' }}>
      ARCOVA - Remotion Video
    </div>
  );
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={MyVideo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
