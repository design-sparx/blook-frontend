import React, {useEffect, useState} from 'react';
import {
  ActionIcon,
  Affix,
  BackgroundImage,
  Box,
  Button,
  Center,
  Container,
  FileButton,
  Group,
  List, LoadingOverlay,
  MultiSelect,
  Stack,
  Text,
  TextInput, Title
} from '@mantine/core';
import {Link, RichTextEditor} from '@mantine/tiptap';
import {openConfirmModal, openModal} from '@mantine/modals';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import {FaArrowCircleUp, FaCloudUploadAlt, FaQuestion, FaTimes} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import {useForm} from '@mantine/form';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchAllCategories} from '../redux/actions/categories';
import {handleCreatePost} from '../api/post';
import slugify from 'slugify';
import {ISelectOption} from '../constants';
import {Helmet} from 'react-helmet';
import {showNotification} from '@mantine/notifications';

const content = '<p>Tell your story...</p>';

const NewPost = (): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [categoriesOptions, setCategoriesOptions] = useState<ISelectOption[]>([]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({types: ['heading', 'paragraph']}),
    ],
    content,
  });
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
      categories: [''],
      slug: '',
      mainImage: '',
      author: '',
    }
  });
  const dispatch = useAppDispatch();
  const {
    loading: categoriesLoading,
    error: categoriesError,
    categories: categoriesData
  } = useAppSelector((state: any) => state.fetchAllCategoriesReducer);
  const {currentUser} = useAppSelector((state: any) => state.userReducer);

  /**
   * tips modal
   */
  const openHelperModal = (): any => {
    return openModal({
      title: <Text weight={500}>Writing a Great Post Title</Text>,
      children: (
        <List>
          <List.Item>Think of your post title as a super short (but compelling!) description — like an overview of the
            actual post in one short sentence.</List.Item>
          <List.Item>Use keywords where appropriate to help ensure people can find your post by search.</List.Item>
        </List>
      )
    });
  };

  /**
   * close new post
   */
  const handleClose = (): void => {
    openConfirmModal({
      title: <Text weight={500}>You have unsaved changes</Text>,
      children: (
        <Text size="sm">
          You&apos;ve made changes to your post. Do you want to navigate to leave this page?
        </Text>
      ),
      labels: {confirm: 'Yes, leave the page', cancel: 'No, keep editing'},
      onCancel: () => console.log('Cancel'),
      onConfirm: () => navigate(-1),
    });
  };

  /**
   * submit profile values
   * @param values
   * @param event
   */
  const handleSubmit = (values: any, event: React.SyntheticEvent): void => {
    if (!Boolean(values.title) || !Boolean(values.categories) || !Boolean(editor?.getHTML())) {
      showNotification({
        title: 'Required fields',
        message: 'Missing post fields! 🤥',
        color: 'orange'
      });
      return;
    }
    setLoading(true);
    handleCreatePost({
      title: values.title,
      categories: values.categories,
      slug: slugify(values.title),
      body: editor?.getHTML(),
      mainImage: selectedFile,
      publishedAt: new Date(),
      author: currentUser
    }).then(res => {
      setLoading(false);
      handleReset();
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  };

  /**
   * reset form
   */
  const handleReset = (): void => {
    setSelectedFile(null);
    form.setValues({
      title: '',
      categories: []
    });
    editor?.commands.setContent('<p>Tell your story...</p>');
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
    const unsub = (): void => {
      dispatch(fetchAllCategories() as any);
    };

    return () => unsub();
  }, [dispatch]);

  useEffect(() => {
    const d: ISelectOption[] = [];
    categoriesData?.map((c: any) => {
      d.push({value: c._id, label: c.title});
    });
    setCategoriesOptions(d);
  }, [categoriesData]);

  return (
    <>
      <Helmet>
        <title>Blook - Create post</title>
      </Helmet>
      <Group px="lg" my="md" position="apart" align="center">
        <Title>Create post</Title>
        <Button leftIcon={<FaTimes size={18}/>} color="red" variant="white" onClick={handleClose}>Close</Button>
      </Group>
      <Container my="xl">
        <LoadingOverlay visible={loading} overlayBlur={2}/>
        <Affix position={{top: 90, right: 60}}>
          <Button variant="light" color="gray" leftIcon={<FaQuestion size={14}/>} onClick={openHelperModal}>
            Help
          </Button>
        </Affix>
        <Stack spacing="xl">
          <Box sx={{width: '100%', height: 250}} mx="auto">
            <BackgroundImage
              src={Boolean(preview) ? preview : 'https://images.unsplash.com/photo-1554757387-2a28855c78fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80'}
              radius="sm"
              sx={{height: '100%'}}
            >
              <Center p="md" sx={{height: '100%'}}>
                <FileButton onChange={setSelectedFile} accept="image/png,image/jpeg">
                  {(props) => <Button
                    variant="white"
                    leftIcon={<FaCloudUploadAlt size={18}/>} {...props}
                  >
                    Upload main image
                  </Button>
                  }
                </FileButton>
              </Center>
            </BackgroundImage>
          </Box>
          <form onSubmit={form.onSubmit((values, event) => handleSubmit(values, event))}>
            <TextInput
              placeholder="new post title here..."
              label="Title"
              mt="md"
              withAsterisk
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            />
            <Stack spacing={0} mt="md">
              <Text weight={500} size="sm">Body</Text>
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
            </Stack>
            <MultiSelect
              data={categoriesOptions}
              mt="md"
              label="Select categories"
              placeholder="Pick categories"
              searchable
              nothingFound="Nothing found"
              clearButtonLabel="Clear selection"
              clearable
              maxDropdownHeight={160}
              transitionDuration={150}
              transition="pop-top-left"
              transitionTimingFunction="ease"
              value={form.values.categories}
              onChange={(values) => form.setFieldValue('categories', values)}
            />
            <Group position="center">
              <Button mt="md" type="submit" leftIcon={<FaArrowCircleUp size={14}/>} loading={loading} size="lg">Publish</Button>
            </Group>
          </form>
        </Stack>
      </Container>
    </>
  );
};

export default NewPost;
