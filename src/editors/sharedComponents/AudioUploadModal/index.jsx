import PropTypes from 'prop-types';

import * as tinyMCEKeys from '../../data/constants/tinyMCE';
import SelectAudioModal from './SelectAudioModal';

export const audioTag = (src) => {
  const audio = document.createElement('audio');
  audio.controls = true;
  audio.setAttribute('src', src);
  return audio.outerHTML;
};

export const getAudioSrc = ({ selection, lmsEndpointUrl, isLibrary }) => {
  if (isLibrary) {
    return selection.portableUrl.replace(/^\//, '');
  }
  return selection.externalUrl.startsWith(lmsEndpointUrl)
    ? selection.externalUrl.substring(lmsEndpointUrl.length)
    : selection.externalUrl;
};

const AudioUploadModal = ({
  audios,
  close,
  editorRef,
  isLibrary,
  isOpen,
  lmsEndpointUrl,
}) => {
  const selectAudio = (selection) => {
    editorRef.current.execCommand(
      tinyMCEKeys.commands.insertContent,
      false,
      audioTag(getAudioSrc({ selection, lmsEndpointUrl, isLibrary })),
    );
    close();
  };

  return (
    <SelectAudioModal
      audios={audios}
      close={close}
      isOpen={isOpen}
      setSelection={selectAudio}
    />
  );
};

AudioUploadModal.propTypes = {
  audios: PropTypes.shape({}).isRequired,
  close: PropTypes.func.isRequired,
  editorRef: PropTypes.shape({ current: PropTypes.shape({ execCommand: PropTypes.func }) }).isRequired,
  isLibrary: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  lmsEndpointUrl: PropTypes.string.isRequired,
};

export const AudioUploadModalInternal = AudioUploadModal;
export default AudioUploadModal;
