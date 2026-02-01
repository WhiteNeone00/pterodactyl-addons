@extends('layouts.admin')
@include('partials/admin.settings.nav', ['activeTab' => 'basic'])

@section('title')
    Whee Service
@endsection

@section('content-header')
    <h1>Whee Service Hub<small>Manage all Whee Service addons.</small></h1>
    <ol class="breadcrumb">
        <li><a href="{{ route('admin.index') }}">Admin</a></li>
        <li class="active">Whee Service Hub</li>
    </ol>
@endsection
@section('content')
@include('admin.bagoucenter.nav')
@include('admin.bagoucenter.settings.nav', ['addon' => null, 'addonslist' => $addonslist, 'licenses' => $licenses])

    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">Whee Service Settings</h3>
                </div>
                <p class="box-body">
                    Choose a tab above for manage addon settings
                </p>
            </div>
        </div>
    </div>
@endsection
