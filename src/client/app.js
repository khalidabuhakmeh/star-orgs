import Directory from './directory';
import GravatarImageRetriever from './gravatar-image-retriever';
import ForceDirectedGraphRenderer from './force-directed-graph-renderer';
import Office365GetPersonaPhotoImageRetriever from './office365-get-persona-photo-image-retriever';

const containerElement = document.getElementById('js-org-svg-container');
const directoryUrl = 'directory';
const filterFunction = x => x.department;

const directory = new Directory();
const imageRetriever = process.env.IMAGE_RETRIEVER === 'Office365GetPersonaPhotoImageRetriever'
  ? new Office365GetPersonaPhotoImageRetriever()
  : new GravatarImageRetriever(150); // eslint-disable-line no-magic-numbers

const renderer = new ForceDirectedGraphRenderer(
  containerElement,
  imageRetriever);

directory
  .getUsers(directoryUrl, filterFunction)
  .then(users => renderer.render(users));

const jsSearchInput = document.getElementById('js-search-input');

jsSearchInput.onfocus = () => jsSearchInput.select();
jsSearchInput.onkeyup = ev => renderer.search(ev.target.value);
