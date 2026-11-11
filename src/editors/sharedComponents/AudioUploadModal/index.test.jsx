import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import * as tinyMCEKeys from '../../data/constants/tinyMCE';
import { AudioUploadModalInternal, audioTag, getAudioSrc } from '.';

jest.mock('./SelectAudioModal', () => function mockSelectAudioModal({ setSelection }) {
  return (
    <button
      type="button"
      onClick={() => setSelection({ externalUrl: 'http://lms.test/asset/audio.mp3' })}
    >
      Select audio
    </button>
  );
});

describe('AudioUploadModal', () => {
  it('creates a controls-enabled audio element and escapes the source', () => {
    expect(audioTag('/asset/audio.mp3?name="test"')).toBe(
      '<audio controls="" src="/asset/audio.mp3?name=&quot;test&quot;"></audio>',
    );
  });

  it('uses a relative course asset URL', () => {
    expect(getAudioSrc({
      selection: { externalUrl: 'http://lms.test/asset-v1:test.mp3' },
      lmsEndpointUrl: 'http://lms.test',
      isLibrary: false,
    })).toBe('/asset-v1:test.mp3');
  });

  it('uses a portable library asset URL', () => {
    expect(getAudioSrc({
      selection: { portableUrl: '/static/test.mp3' },
      lmsEndpointUrl: 'http://lms.test',
      isLibrary: true,
    })).toBe('static/test.mp3');
  });

  it('inserts the selected audio and closes the modal', () => {
    const close = jest.fn();
    const execCommand = jest.fn();
    render(
      <AudioUploadModalInternal
        audios={{}}
        close={close}
        editorRef={{ current: { execCommand } }}
        isLibrary={false}
        isOpen
        lmsEndpointUrl="http://lms.test"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select audio' }));

    expect(execCommand).toHaveBeenCalledWith(
      tinyMCEKeys.commands.insertContent,
      false,
      '<audio controls="" src="/asset/audio.mp3"></audio>',
    );
    expect(close).toHaveBeenCalled();
  });
});
