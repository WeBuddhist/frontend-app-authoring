import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Alert } from '@openedx/paragon';
import { AudioFile } from '@openedx/paragon/icons';
import { FormattedMessage } from '@edx/frontend-platform/i18n';
import { debounce } from 'lodash';

import { RequestKeys } from '../../data/constants/requests';
import { selectors, thunkActions } from '../../data/redux';
import SelectionModal from '../SelectionModal';
import { imgHooks } from '../ImageUploadModal/SelectImageModal/hooks';
import messages from './messages';
import { acceptedAudioKeys } from './utils';

const SelectAudioModal = ({
  isOpen,
  close,
  setSelection,
  audios,
  isLoaded,
  isFetchError,
  isUploadError,
  isLibrary,
  audioCount,
}) => {
  const dispatch = useDispatch();
  const searchAssets = React.useMemo(() => debounce((searchString) => {
    dispatch(thunkActions.app.fetchAudios({ pageNumber: 0, searchString }));
  }, 300), [dispatch]);
  React.useEffect(() => () => searchAssets.cancel(), [searchAssets]);

  const {
    galleryError,
    inputError,
    fileInput,
    galleryProps,
    searchSortProps,
    selectBtnProps,
  } = imgHooks({
    setSelection,
    clearSelection: () => {},
    images: Object.values(audios),
    imageCount: audioCount,
    assetType: 'audio',
    fetchAssets: thunkActions.app.fetchAudios,
    feedbackMessages: messages,
    searchAssets,
  });

  return (
    <SelectionModal
      isOpen={isOpen}
      close={close}
      galleryError={galleryError}
      inputError={inputError}
      fileInput={fileInput}
      galleryProps={{
        ...galleryProps,
        thumbnailFallback: <AudioFile className="m-4" />,
        alwaysShowThumbnailFallback: true,
      }}
      searchSortProps={searchSortProps}
      selectBtnProps={selectBtnProps}
      acceptedFiles={acceptedAudioKeys}
      modalMessages={{
        confirmMsg: messages.selectButtonLabel,
        titleMsg: messages.titleLabel,
        uploadButtonMsg: messages.uploadButtonLabel,
        fetchError: messages.fetchAudiosError,
        uploadError: messages.uploadAudioError,
      }}
      isLoaded={isLoaded}
      isFetchError={isFetchError}
      isUploadError={isUploadError}
      isLibrary={isLibrary}
      notice={(
        <Alert variant="info">
          <FormattedMessage {...messages.transcriptNotice} />
        </Alert>
      )}
    />
  );
};

SelectAudioModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setSelection: PropTypes.func.isRequired,
  audios: PropTypes.shape({}).isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isFetchError: PropTypes.bool.isRequired,
  isUploadError: PropTypes.bool.isRequired,
  isLibrary: PropTypes.bool.isRequired,
  audioCount: PropTypes.number.isRequired,
};

export const mapStateToProps = (state) => ({
  isLoaded: selectors.requests.isFinished(state, { requestKey: RequestKeys.fetchAudios }),
  isFetchError: selectors.requests.isFailed(state, { requestKey: RequestKeys.fetchAudios }),
  isUploadError: selectors.requests.isFailed(state, { requestKey: RequestKeys.uploadAsset }),
  isLibrary: selectors.app.isLibrary(state),
  audioCount: state.app.audioCount,
});

export { SelectAudioModal as SelectAudioModalInternal };
export default connect(mapStateToProps)(SelectAudioModal);
