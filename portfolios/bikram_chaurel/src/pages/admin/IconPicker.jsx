import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';

const COMMON_ICONS = [
  'Activity', 'Airplay', 'AlertCircle', 'AlertOctagon', 'AlertTriangle', 'AlignCenter', 'AlignJustify', 'AlignLeft', 'AlignRight',
  'Anchor', 'Aperture', 'Archive', 'ArrowDownCircle', 'ArrowDownLeft', 'ArrowDownRight', 'ArrowDown', 'ArrowLeftCircle', 'ArrowLeft',
  'ArrowRightCircle', 'ArrowRight', 'ArrowUpCircle', 'ArrowUpLeft', 'ArrowUpRight', 'ArrowUp', 'AtSign', 'Award', 'BarChart2',
  'BarChart', 'BatteryCharging', 'Battery', 'BellOff', 'Bell', 'Bluetooth', 'Bold', 'BookOpen', 'Book', 'Bookmark', 'Box',
  'Briefcase', 'Calendar', 'CameraOff', 'Camera', 'Cast', 'CheckCircle', 'CheckSquare', 'Check', 'ChevronDown', 'ChevronLeft',
  'ChevronRight', 'ChevronUp', 'ChevronsDown', 'ChevronsLeft', 'ChevronsRight', 'ChevronsUp', 'Chrome', 'Circle', 'Clipboard',
  'Clock', 'CloudDrizzle', 'CloudLightning', 'CloudOff', 'CloudRain', 'CloudSnow', 'Cloud', 'Code', 'Codepen', 'Codesandbox',
  'Coffee', 'Columns', 'Command', 'Compass', 'Copy', 'CornerDownLeft', 'CornerDownRight', 'CornerLeftDown', 'CornerLeftUp',
  'CornerRightDown', 'CornerRightUp', 'CornerUpLeft', 'CornerUpRight', 'Cpu', 'CreditCard', 'Crop', 'Crosshair', 'Database',
  'Delete', 'Disc', 'DivideCircle', 'DivideSquare', 'Divide', 'DollarSign', 'DownloadCloud', 'Download', 'Dribbble', 'Droplet',
  'Edit2', 'Edit3', 'Edit', 'ExternalLink', 'EyeOff', 'Eye', 'Facebook', 'FastForward', 'Feather', 'Figma', 'FileMinus', 'FilePlus',
  'FileText', 'File', 'Film', 'Filter', 'Flag', 'FolderMinus', 'FolderPlus', 'Folder', 'Framer', 'Frown', 'Gift', 'GitBranch',
  'GitCommit', 'GitMerge', 'GitPullRequest', 'Github', 'Gitlab', 'Globe', 'Grid', 'HardDrive', 'Hash', 'Headphones', 'Heart',
  'HelpCircle', 'Hexagon', 'Home', 'Image', 'Inbox', 'Info', 'Instagram', 'Italic', 'Key', 'Layers', 'Layout', 'LifeBuoy',
  'Link2', 'Link', 'Linkedin', 'List', 'Loader', 'Lock', 'LogIn', 'LogOut', 'Mail', 'MapPin', 'Map', 'Maximize2', 'Maximize',
  'Meh', 'Menu', 'MessageCircle', 'MessageSquare', 'MicOff', 'Mic', 'Minimize2', 'Minimize', 'MinusCircle', 'MinusSquare',
  'Minus', 'Monitor', 'Moon', 'MoreHorizontal', 'MoreVertical', 'MousePointer', 'Move', 'Music', 'Navigation2', 'Navigation',
  'Octagon', 'Package', 'Paperclip', 'PauseCircle', 'Pause', 'PenTool', 'Percent', 'PhoneCall', 'PhoneForwarded', 'PhoneIncoming',
  'PhoneMissed', 'PhoneOff', 'PhoneOutgoing', 'Phone', 'PieChart', 'PlayCircle', 'Play', 'PlusCircle', 'PlusSquare', 'Plus',
  'Pocket', 'Power', 'Printer', 'Radio', 'RefreshCcw', 'RefreshCw', 'Repeat', 'Rewind', 'RotateCcw', 'RotateCw', 'Rss', 'Save',
  'Scissors', 'Search', 'Send', 'Server', 'Settings', 'Share2', 'Share', 'ShieldOff', 'Shield', 'ShoppingBag', 'ShoppingCart',
  'Shuffle', 'Sidebar', 'SkipBack', 'SkipForward', 'Slack', 'Slash', 'Sliders', 'Smartphone', 'Smile', 'Speaker', 'Square',
  'Star', 'StopCircle', 'Sun', 'Sunrise', 'Sunset', 'Tablet', 'Tag', 'Target', 'Terminal', 'Thermometer', 'ThumbsDown',
  'ThumbsUp', 'ToggleLeft', 'ToggleRight', 'Tool', 'Trash2', 'Trash', 'Trello', 'TrendingDown', 'TrendingUp', 'Triangle',
  'Truck', 'Tv', 'Twitch', 'Twitter', 'Type', 'Umbrella', 'Underline', 'Unlock', 'UploadCloud', 'Upload', 'UserCheck',
  'UserMinus', 'UserPlus', 'UserX', 'User', 'Users', 'VideoOff', 'Video', 'Voicemail', 'Volume1', 'Volume2', 'VolumeX',
  'Volume', 'Watch', 'WifiOff', 'Wifi', 'Wind', 'XCircle', 'XOctagon', 'XSquare', 'X', 'Youtube', 'ZapOff', 'Zap', 'ZoomIn',
  'ZoomOut', 'Brain', 'GraduationCap', 'BookText', 'Lightbulb', 'FileCheck', 'BookMarked', 'UserCog', 'Landmark', 'Gavel',
  'Scale', 'School', 'Tent', 'Handshake', 'MessageCircleQuestion', 'Network', 'Rocket', 'Library', 'Microscope',
  'FlaskConical', 'Dna', 'ChartPie', 'NotebookPen', 'CloudFog', 'Code2', 'Cpu', 'Database', 'FileCode2', 'Globe2',
  'Laptop', 'ServerCog', 'TerminalSquare', 'Blocks', 'AppWindow', 'Component', 'FolderGit2'
];

export default function IconPicker({ value, onChange }) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredIcons = useMemo(() => {
    if (!search) return COMMON_ICONS;
    const lower = search.toLowerCase();
    return COMMON_ICONS.filter(name => name.toLowerCase().includes(lower));
  }, [search]);

  const SelectedIcon = (value && LucideIcons[value]) ? LucideIcons[value] : LucideIcons.Lightbulb;

  return (
    <div className="admin-field" style={{ position: 'relative' }}>
      <label className="admin-label">Icon</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px', 
          padding: '10px 14px', border: '1px solid var(--border-soft, #ccc)',
          borderRadius: '8px', cursor: 'pointer', background: 'var(--surface, #fff)',
          minHeight: '44px'
        }}
      >
        <SelectedIcon size={20} color="var(--merlot, #722F37)" />
        <span style={{ color: value ? 'var(--ink, #333)' : 'var(--ink-light, #666)', fontSize: '0.9rem' }}>
          {value || 'Select an icon... (Default: Lightbulb)'}
        </span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'var(--surface, #fff)', border: '1px solid var(--border-soft, #ccc)',
          borderRadius: '8px', marginTop: '5px', zIndex: 50,
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '12px'
        }}>
          <input 
            type="text" 
            className="admin-input" 
            placeholder="Search icons (e.g. AI, Cloud, Brain, Java)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: '12px', width: '100%' }}
            onClick={e => e.stopPropagation()}
          />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(44px, 1fr))',
            gap: '8px', maxHeight: '220px', overflowY: 'auto', paddingRight: '4px'
          }}>
            {filteredIcons.map(iconName => {
              const IconComp = LucideIcons[iconName];
              if (!IconComp) return null;
              const isSelected = value === iconName;
              return (
                <button
                  key={iconName}
                  type="button"
                  onClick={() => { onChange(iconName); setIsOpen(false); setSearch(''); }}
                  title={iconName}
                  style={{
                    padding: '10px', border: '1px solid',
                    borderColor: isSelected ? 'var(--merlot, #722F37)' : 'var(--border-soft, #ccc)',
                    borderRadius: '6px', background: isSelected ? 'var(--merlot-subtle, #F5EAEB)' : 'transparent',
                    cursor: 'pointer', display: 'flex', justifyContent: 'center',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--merlot-light, #9E4A56)';
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.borderColor = 'var(--border-soft, #ccc)';
                  }}
                >
                  <IconComp size={20} color={isSelected ? 'var(--merlot, #722F37)' : 'var(--ink, #333)'} />
                </button>
              );
            })}
            {filteredIcons.length === 0 && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', fontSize: '0.85rem', color: 'var(--ink-light, #666)', padding: '20px 0' }}>
                No icons found for "{search}".
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
