import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  title: {
    id: 'course-authoring.plugins.recording-course-tool.title',
    defaultMessage: 'From a teaching recording',
    description: 'Item in the "Create with a tool" menu that opens the studio-extension recording pipeline',
  },
  description: {
    id: 'course-authoring.plugins.recording-course-tool.description',
    defaultMessage: 'Upload a teaching recording and turn it into sections, lessons, text and audio.',
    description: 'Helper text under the "From a teaching recording" item in the "Create with a tool" menu',
  },
  newBadge: {
    id: 'course-authoring.plugins.recording-course-tool.new-badge',
    defaultMessage: 'New',
    description: 'Badge next to the "From a teaching recording" item, marking it as a new tool',
  },
});

export default messages;
