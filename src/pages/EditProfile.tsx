import React, {useEffect, useState} from 'react';
import {
  Avatar,
  Breadcrumbs,
  Anchor,
  Button,
  createStyles,
  Group,
  MantineTheme,
  Text,
  TextInput,
  Title, FileButton, SimpleGrid, LoadingOverlay
} from '@mantine/core';
import {RichTextEditor} from '@mantine/tiptap';
import {useAppSelector} from '../hooks/hooks';
import {Link} from 'react-router-dom';
import {useForm} from '@mantine/form';
import {useEditor} from '@tiptap/react';
import {FaCloudUploadAlt, FaSave} from 'react-icons/fa';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import {Wrapper} from '../layout';
import {Layout} from '../constants/Layout';
import {handleFetchAuthor, handlePatchAuthor} from '../api/author';
import {IUser} from '../constants';
import {toPlainText} from '@portabletext/react';
import {urlFor} from '../client';
import {Helmet} from 'react-helmet';
import {showNotification} from '@mantine/notifications';
import {BackBtn} from '../components/back-btn';

const useStyles = createStyles((theme: MantineTheme) => ({
  wrapper: {
    minHeight: 400,
    boxSizing: 'border-box',
    borderRadius: theme.radius.md,
  },

  title: {
    color: theme.white,
    lineHeight: 1,
  },

  description: {
    color: theme.colors[theme.primaryColor][0],
    maxWidth: 300,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
  },

  social: {
    color: theme.white,

    '&:hover': {
      color: theme.colors[theme.primaryColor][1],
    },
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    '&::placeholder': {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },

  control: {
    backgroundColor: theme.colors[theme.primaryColor][6],
  },
}));

const EditProfile = (): JSX.Element => {
  const {currentUser} = useAppSelector((state: any) => state.userReducer);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IUser>();
  const [content, setContent] = useState('<p>Brief description for your profile. URLs are hyperlinked.</p>');
  const {classes} = useStyles();
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      website: '',
      slug: '',
      bio: '',
      image: ''
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
    ],
    content,
  });
  const avatarImageUrl = Boolean(currentUser?.image) && urlFor(currentUser?.image).width(100).url();

  /**
   * submit profile values
   * @param values
   * @param event
   */
  const handleSubmit = (values: IUser, event: React.SyntheticEvent): void => {
    if (!Boolean(values.name) || !Boolean(values.email) || !Boolean(values.slug)) {
      showNotification({
        title: 'Required fields',
        message: 'Missing post fields! 🤥',
        color: 'orange'
      });
      return;
    }
    setLoading(true);
    handlePatchAuthor({
      _id: currentUser._id,
      name: values.name,
      email: values.email,
      slug: values.slug,
      website: values.website,
      bio: editor?.getHTML(),
      image: selectedFile
    }).then(res => {
      console.log(res);
      setLoading(false);
      setSelectedFile(null);
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  const handleRemoveProfilePicture = (): void => {
    setSelectedFile(null);
  };

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    handleFetchAuthor(currentUser).then(res => {
      setData(res[0]);
      const d = res[0];
      form.setValues({
        image: '',
        name: d?.name,
        email: d?.email || '',
        slug: d?.slug?.current,
        bio: d?.bio,
        website: d?.website
      });
    }).catch((error: any) => console.log(error));
  }, []);

  useEffect(() => {
    editor?.commands.setContent(toPlainText(data?.bio || '<p>Tell us about yourself</p>'));
  }, [data?.bio]);

  return (
    <Wrapper layout={Layout.One} showSide={false}>
      <Helmet>
        <title>Blook - Edit profile</title>
      </Helmet>
      <div className={classes.wrapper}>
        <LoadingOverlay visible={loading} overlayBlur={2}/>
        <Group mb="xl">
          <BackBtn/>
          <Title order={3}>Edit profile</Title>
        </Group>
        <form onSubmit={form.onSubmit((values, event) => handleSubmit(values, event))}>
          <Group my="md">
            <SimpleGrid cols={1}>
              <Avatar src={Boolean(preview) ? preview : avatarImageUrl} size="xl" radius="md"/>
            </SimpleGrid>
            <FileButton onChange={setSelectedFile} accept="image/png,image/jpeg">
              {(props) => <Button variant="subtle" {...props} leftIcon={<FaCloudUploadAlt/>}>
                Upload new profile picture</Button>}
            </FileButton>
          </Group>
          <TextInput
            label="Name"
            placeholder="John Doe"
            classNames={{input: classes.input, label: classes.inputLabel}}
            value={form.values.name}
            onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
          />
          <TextInput
            label="Email"
            placeholder="your@email.com"
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
          />
          <TextInput
            label="Username"
            placeholder="john-doe"
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
            value={form.values.slug}
            onChange={(event) => form.setFieldValue('slug', event.currentTarget.value)}
          />
          <TextInput
            label="Website"
            placeholder="www.johndoe.com"
            mt="md"
            classNames={{input: classes.input, label: classes.inputLabel}}
            value={form.values.website}
            onChange={(event) => form.setFieldValue('website', event.currentTarget.value)}
          />
          <Text size="sm" weight={600} mt="md">Bio</Text>
          <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar sticky stickyOffset={60}>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold/>
                <RichTextEditor.Italic/>
                <RichTextEditor.Underline/>
                <RichTextEditor.Strikethrough/>
                <RichTextEditor.ClearFormatting/>
                <RichTextEditor.Highlight/>
                <RichTextEditor.Code/>
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1/>
                <RichTextEditor.H2/>
                <RichTextEditor.H3/>
                <RichTextEditor.H4/>
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Blockquote/>
                <RichTextEditor.Hr/>
                <RichTextEditor.BulletList/>
                <RichTextEditor.OrderedList/>
                <RichTextEditor.Subscript/>
                <RichTextEditor.Superscript/>
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Link/>
                <RichTextEditor.Unlink/>
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.AlignLeft/>
                <RichTextEditor.AlignCenter/>
                <RichTextEditor.AlignJustify/>
                <RichTextEditor.AlignRight/>
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>
            <RichTextEditor.Content/>
          </RichTextEditor>
          <Group position="center" mt="md">
            <Button className={classes.control} leftIcon={<FaSave/>} type="submit" loading={loading} size="lg">Save</Button>
          </Group>
        </form>
      </div>
    </Wrapper>
  );
};

export default EditProfile;
