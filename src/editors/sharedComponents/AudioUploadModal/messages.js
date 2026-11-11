import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  selectButtonLabel: {
    id: 'authoring.texteditor.selectaudiomodal.select.label',
    defaultMessage: 'Add audio',
    description: 'Label for the audio selection confirmation button',
  },
  uploadButtonLabel: {
    id: 'authoring.texteditor.selectaudiomodal.upload.label',
    defaultMessage: 'Upload new audio (10 MB max)',
    description: 'Label for the audio upload button',
  },
  titleLabel: {
    id: 'authoring.texteditor.selectaudiomodal.title.label',
    defaultMessage: 'Add audio',
    description: 'Title for the audio selection modal',
  },
  transcriptNotice: {
    id: 'authoring.texteditor.selectaudiomodal.transcriptNotice',
    defaultMessage: 'For accessibility, add an adjacent transcript that provides the same information as the audio.',
    description: 'Reminder to provide an accessible alternative for audio content',
  },
  emptyGalleryLabel: {
    id: 'authoring.texteditor.selectaudiomodal.emptyGalleryLabel',
    defaultMessage: 'No audio files found. Upload an audio file using the button below.',
    description: 'Label for an empty audio gallery',
  },
  uploadAudioError: {
    id: 'authoring.texteditor.selectaudiomodal.error.uploadAudioError',
    defaultMessage: 'Failed to upload audio. Please try again.',
    description: 'Message presented when audio upload fails',
  },
  fetchAudiosError: {
    id: 'authoring.texteditor.selectaudiomodal.error.fetchAudiosError',
    defaultMessage: 'Failed to obtain audio files. Please try again.',
    description: 'Message presented when audio files cannot be loaded',
  },
  fileSizeError: {
    id: 'authoring.texteditor.selectaudiomodal.error.fileSizeError',
    defaultMessage: 'Audio files must be 10 MB or less.',
    description: 'Message presented when an audio file is too large',
  },
  selectImageError: {
    id: 'authoring.texteditor.selectaudiomodal.error.selectAudioError',
    defaultMessage: 'Select an audio file to continue.',
    description: 'Message presented when no audio file is selected',
  },
});

export default messages;
