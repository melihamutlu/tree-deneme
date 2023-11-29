import React, { useState } from 'react';
import { CarryOutOutlined, CheckOutlined, FormOutlined } from '@ant-design/icons';
import { Button, Input, Popconfirm, Select, Switch, Tree } from 'antd';
import type { Key } from 'antd/lib/table/interface';
import { DataNode } from 'antd/lib/tree';

const { TreeNode } = Tree;

const AntdTree: React.FC = () => {
  const [treeData, setTreeData] = useState<DataNode[]>([
    {
      title: 'parent 1',
      key: '0-0',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-0-0', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-0-0-1', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-0-0-2', icon: <CarryOutOutlined /> },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          icon: <CarryOutOutlined />,
          children: [{ title: 'leaf', key: '0-0-1-0', icon: <CarryOutOutlined /> }],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-0-2-0', icon: <CarryOutOutlined /> },
            {
              title: 'leaf',
              key: '0-0-2-1',
              icon: <CarryOutOutlined />,
              switcherIcon: <FormOutlined />,
            },
          ],
        },
      ],
    },
    {
      title: 'parent 2',
      key: '0-1',
      icon: <CarryOutOutlined />,
      children: [
        {
          title: 'parent 2-0',
          key: '0-1-0',
          icon: <CarryOutOutlined />,
          children: [
            { title: 'leaf', key: '0-1-0-0', icon: <CarryOutOutlined /> },
            { title: 'leaf', key: '0-1-0-1', icon: <CarryOutOutlined /> },
          ],
        },
      ],
    },
  ]);

  const [showLine, setShowLine] = useState<boolean>(true);
  const [showLeafIcon, setShowLeafIcon] = useState<boolean | React.ReactNode>(true);
  const [newNodeTitle, setNewNodeTitle] = useState<string>('');

  const onSelect = (selectedKeys: Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  const handleLeafIconChange = (value: 'true' | 'false' | 'custom') => {
    if (value === 'custom') {
      return setShowLeafIcon(<CheckOutlined />);
    }

    if (value === 'true') {
      return setShowLeafIcon(true);
    }

    return setShowLeafIcon(false);
  };

  const addNode = () => {
    const newKey = `${Math.floor(Math.random() * 1000000)}`;
    const newNode: DataNode = {
      title: newNodeTitle || `New Node ${newKey}`,
      key: newKey,
      icon: <CarryOutOutlined />,
    };

    setTreeData([...treeData, newNode]);
    setNewNodeTitle('');
  };

  const removeNode = (key: React.Key) => {
    const updatedTreeData = treeData.filter(node => node.key !== key);
    setTreeData(updatedTreeData);
  };

  // Düğüm silme onayı
  const confirmDelete = (key: React.Key) => {
    removeNode(key);
  };

  // Düğüm silme iptali
  const cancelDelete = () => {
    console.log('Deletion cancelled');
  };

  const renderTreeNodes = (nodes: DataNode[]): React.ReactNode =>
    nodes.map(node => {
      const { children, ...restNodeProps } = node;

      return (
        <TreeNode {...restNodeProps} key={node.key} title={node.title} icon={node.icon}>
          {Array.isArray(children) && children.length > 0 && renderTreeNodes(children)}
        </TreeNode>
      );
    });

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Input
          style={{ width: 200, marginRight: 8 }}
          placeholder="Enter node title"
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
        />
        <Button type="primary" onClick={addNode}>
          Add Node
        </Button>
        {treeData.length > 0 && (
          <Popconfirm
            title="Are you sure delete this node?"
            onConfirm={() => removeNode(treeData[0].key)} // İlk düğümü silmek için treeData'dan key'i alınmıştır.
            onCancel={cancelDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              Remove Node
            </Button>
          </Popconfirm>
        )}
        <br />
        showLine: <Switch checked={!!showLine} onChange={setShowLine} />
        <br />
        showLeafIcon:{' '}
        <Select defaultValue="true" onChange={handleLeafIconChange}>
          <Select.Option value="true">True</Select.Option>
          <Select.Option value="false">False</Select.Option>
          <Select.Option value="custom">Custom icon</Select.Option>
        </Select>
      </div>
      <Tree
        showLine={showLine ? { showLeafIcon } : false}
        defaultExpandedKeys={['0-0-0']}
        onSelect={onSelect}
        treeData={treeData}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    
    </div>
  );
};

export default AntdTree;
