import { useIntl } from '@edx/frontend-platform/i18n';
import { Mic as MicIcon } from '@openedx/paragon/icons';

import { CreateToolMenuItem } from '@src/plugin-slots/CourseOutlineCreateToolsSlot';
import { getStudioExtensionUrl } from '../studioExtension';
import messages from './messages';

interface RecordingCourseToolProps {
  courseId: string;
}

/**
 * "From a teaching recording" tool for CourseOutlineCreateToolsSlot.
 * Opens the course-from-recording tool of the studio-extension MFE, which builds this course's outline
 * from a teaching recording. Hidden when STUDIO_EXTENSION_MFE_URL is not configured.
 */
const RecordingCourseTool = ({ courseId }: RecordingCourseToolProps) => {
  const intl = useIntl();
  const href = getStudioExtensionUrl(`course-from-recording/${courseId}`);

  if (!href) {
    return null;
  }

  return (
    <CreateToolMenuItem
      icon={MicIcon}
      title={intl.formatMessage(messages.title)}
      description={intl.formatMessage(messages.description)}
      badge={intl.formatMessage(messages.newBadge)}
      href={href}
    />
  );
};

export default RecordingCourseTool;
