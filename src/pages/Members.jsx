import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Selection, Inject, Edit, Toolbar, Sort, Filter } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';
import API from '../api/api';

const Members = () => {
  const [members, setMembers] = useState([]);

  const selectionsettings = { persistSelection: true };
  const toolbarOptions = ['Edit', 'Delete', 'Update', 'Cancel'];
  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    // loadMembers().then(r => );
  }, []);

  const loadMembers = async () => {
    const response = await API.getMembers();
    setMembers(response.data);
  };

  const handleActionComplete = async (args) => {
    if (args.requestType === 'delete') {
      await deleteMember(args.data[0].id);
    }

    if (args.requestType === 'save') {
      await updateMember(args.data.id, args.data);
    }

    await loadMembers();
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Church Members" />

      <GridComponent
        dataSource={members}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        editSettings={editing}
        allowSorting
        actionComplete={handleActionComplete}
      >
        <ColumnsDirective>
          <ColumnDirective field="id" headerText="ID" width="80" isPrimaryKey textAlign="Center" />
          <ColumnDirective field="name" headerText="Name" width="150" />
          <ColumnDirective field="phone" headerText="Phone" width="120" />
          <ColumnDirective field="ministry" headerText="Ministry" width="140" />
          <ColumnDirective field="status" headerText="Status" width="120" />
          <ColumnDirective field="created_at" headerText="Joined" width="120" format="yMd" />
        </ColumnsDirective>

        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Members;
