import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  toggleLabel: {
    id: 'course-authoring.course-outline.create-tools.toggle',
    defaultMessage: 'Create with a tool',
    description: 'Button on the empty course outline that opens the menu of course-creation tools',
  },
  manualLabel: {
    id: 'course-authoring.course-outline.empty-placeholder.manual-label',
    defaultMessage: 'or build it yourself',
    description: 'Label above the "New section" and "Use section from library" buttons on the empty course outline, below the "Create with a tool" menu',
  },
});

export default messages;
